import React, { useState, useEffect } from 'react';
import './css/App.css';
import nanoid from 'nanoid';

// Containers
import Project from './Core/Project';

import { URL } from './Config/Database';
import axios from 'axios';

import Popup from './Components/Popup';
import Tags from './Core/Tags';
import {
  MenuBar,
  MenuButton
} from './Components/AppMenuBar';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [popup, setPopup] = useState({
    newProject: false,
    tags: false
  });
  // GET request to database
  useEffect(() => {
    axios.get(URL + '/projects.json').then( response => {
      if(response.data){
        const fetchedProjects = Object.values(response.data);
        fetchedProjects.forEach( project => {
          if(!project.tasks){
            project.tasks = []
          }
        })
        setProjects(fetchedProjects);
      };
    });
  }, []);

  const addProject = () => {
    const projectName = document.getElementById('addProjectName').value;
    const projectDesription = document.getElementById('addProjectDesription').value;
    const project = {
      id: nanoid(),
      name: projectName,
      description: projectDesription,
      tasks: [],
      due: new Date(),
    }
    setProjects(projects.concat([project]));
    setPopup(false);
    axios.put(URL + `/projects/${project.id}.json`, project);
  }

  const toggleNewProjectPopup = () => setPopup({tags: false, newProject: !popup.newProject});
  const toggleTagsPopup = () => setPopup({newProject: false, tags: !popup.tags});
  const newProjectPopup = (
    <Popup close = {toggleNewProjectPopup}>
        <input type="text" id="addProjectName" placeholder="Project Name"/>
          <textarea id="addProjectDesription"/>
          <section className="popup_control-panel">
            <button onClick={addProject}>Submit</button>
          </section>
    </Popup>
  )


  const [selectedTag, setSelectedTag] = useState({name: '', color: ''});
  
  const ProjectProps = {
    projects: projects,
    setProjects: setProjects
  }

  return (
    <div className="App">
      {/* Popups */}
      {popup.newProject ? newProjectPopup : null}
      {popup.tags ? <Tags toggleTagsPopup={toggleTagsPopup} selectTag={tag => setSelectedTag(tag)} selectedTag={selectedTag}/> : null}
      <MenuBar>
          <MenuButton control={toggleNewProjectPopup}>New</MenuButton>
          <MenuButton control={toggleTagsPopup}>Tags</MenuButton>
      </MenuBar>
      <div className="projects">
        {projects.map( p => <Project 
                              project={p} 
                              key={p.id}
                              {...ProjectProps}/>)}
      </div>
    </div>
  );
};

export default App;
