import React, { useState, useEffect } from "react";

import axios from "axios";
import { URL } from "../Config/Database";

import { Wrapper, TagsList, AddingTag } from "../Components/Tags";

const Tags = props => {
  const [tags, setTags] = useState([{ name: "Default", color: "gray" }]);

  const [addTagMode, setAddTagMode] = useState(false);

  // * Call to database to fetch tags
  useEffect(() => {
    axios.get(URL + "/config/tags.json").then(response => {
      const fetchedTags = response.data;
      // The default tag
      if (fetchedTags) setTags(fetchedTags);
    });
  }, []);

  const toggleAddTagMode = () => setAddTagMode(!addTagMode);
  const addTag = color => {
    const tagName = document.getElementById("addTagName").value;
    const tag = {
      name: tagName,
      color: color
    };
    const newTags = tags.concat([tag]);
    setTags(newTags);
    axios.put(URL + `/config/tags.json`, newTags);
  };
  const { toggleTagsPopup, selectTag, selectedTag } = props;
  console.log(selectedTag);
  return (
    <Wrapper
      toggleTagsPopup={toggleTagsPopup}
      toggleAddTag={toggleAddTagMode}
      addTagModeStatus={addTagMode}
    >
      {addTagMode ? (
        <AddingTag addTag={addTag} toggleAddTag={toggleAddTagMode} />
      ) : (
        <TagsList tags={tags} selectTag={selectTag} selectedTag={selectedTag} />
      )}
    </Wrapper>
  );
};

export default Tags;
