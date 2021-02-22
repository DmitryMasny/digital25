import { useSelector } from "react-redux";

export const windowWidthSelector = ( state ) => state.global.windowWidth;
export const windowHeightSelector = ( state ) => state.global.windowHeight;
export const windowMediaSelector = ( state ) => state.global.windowMedia;
export const windowIsMobileSelector = ( state ) => state.global.windowIsMobile;
export const windowOrientationSelector = ( state ) => state.global.windowOrientation;
export const windowScroll = ( state ) => state.global.windowScroll;

export const global = {
    window: {
        width: s => s.global.window.width
    },
    list: s => s.global.list,
    listItemActive: createSelector(
        state => state.todos,
        todos => todos.filter(todo => todo.isDone).length
    )
}

// import {global} from 'selectors'

const wWidth = useSelector(global.window.width)
const listItemActive = useSelector(global.listItemActive)


import { createSelector } from 'reselect'

const selectNumOfDoneTodos = createSelector(
    state => state.todos,
    todos => todos.filter(todo => todo.isDone).length
)

export const DoneTodosCounter = () => {
    const NumOfDoneTodos = useSelector(selectNumOfDoneTodos)
    return <div>{NumOfDoneTodos}</div>
}