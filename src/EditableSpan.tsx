import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void
};


function EditableSpan(props: EditableSpanPropsType) {
const [editMode, setEditMode] = useState(false)

const [title, setTitle] = useState("")

const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title) //put on edit input only when we come to edit

}


const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
}


const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title)
}
    return editMode 
    ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}



export default EditableSpan