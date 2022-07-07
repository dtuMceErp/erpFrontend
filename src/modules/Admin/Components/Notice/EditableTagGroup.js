import React from "react";
import { Tag, Input, Row, AutoComplete } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { TAGS_SUGGESTIONS } from "../../../../@constant/constant";

let tagsArray = [];

const options = [
  { value: "NAAC" },
  { value: "NBA" },
  { value: "IQAC" },
  { value: "AICTE" },
  { value: "Placement" },
];

export class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
  };

  tags_suggestions = TAGS_SUGGESTIONS;

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
    tagsArray = tags;
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
      tagsArray = [...tagsArray, inputValue];
    }
    // console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  addTag = (value) => {
    console.log(value);
  };

  addTagDynamically = (value) => {
    console.log(value);
    let { tags } = this.state;
    this.tags_suggestions.splice(this.tags_suggestions.indexOf(value), 1);

    tags = new Set([...tags, value]);
    tagsArray = new Set([...tagsArray, value]);
    this.setState({ ...this.state, tags: tags });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  onSelect = (value) => {
    console.log("onSelect", value);
    this.setState({ inputValue: value });
  };

  forMap = (tag) => {
    const tagElem = (
      <Tag
        style={{
          marginLeft: "8px",
          padding: "8px",
          alignItems: "center",
          alignContent: "center",
          height: "35px",
          borderRadius: "8px",
          // display: "flex",
          justifyContent: "center",
          width: "auto",
        }}
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  dosomething() {
    console.log("Do something is called");
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div>
        <Row>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              enter={{
                scale: 1,
                opacity: 0,
                type: "from",
                duration: 100,
                onComplete: (e) => {
                  e.target.style = "";
                },
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible && (
            <AutoComplete
              options={options}
              style={{ width: 200 }}
              onSelect={this.onSelect}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            >
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{
                  width: 78,
                  marginLeft: "8px",
                  padding: "8px",
                  alignItems: "center",
                  alignContent: "center",
                  height: "35px",
                  borderRadius: "8px",
                  display: "flex",
                }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            </AutoComplete>
          )}
          {!inputVisible && (
            <Tag
              style={{
                marginLeft: "8px",
                padding: "8px",
                alignItems: "center",
                alignContent: "center",
                height: "35px",
                borderRadius: "8px",
                display: "flex",
              }}
              onClick={this.showInput}
            >
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </Row>
      </div>
    );
  }
}

export { tagsArray };
