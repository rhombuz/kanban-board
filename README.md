A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!

Architectural Extensions
Modifications in tables and api endpoints:

1. If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed

   Currently, the stages are created as an array of JavaScript objects. If these need to be configurable, they need to be handled by a dynamic component with states for each stage (object). These can be modified via a hook to set these states according to the users preference.
   If they are being received from a server endpoint, we'd use a 'fetch()' call to the server api and update the component state accordingly.

2. If users can comment on tasks

   If users can comment on the tasks, there will be an additional field in the initial state of 'items' with an empty string value.
   For the presentational aspect, we can use an input field with the value taken from the state value of item (e.g. item.comment after filter, map) and specify an 'onChange' event handler function to setState of the items accordingly.

   Ideally, we would fetch the items from a data endpoint (e.g. '/api/tasks', which will be added) and keep our state updated throughout the application lifecycle. At the end, we would update the state with the server.

3. How will you do error handling?

   For the server side and event handler code, we can add try-catch blocks, wherever necessary, based on response or modifications on the state.
   For the JSX elements, we can use Error Boundaries instead, by wrapping the parent components with ErrorBoundary tag and specifying the lifecycle methods static getDerievedStateFromError(error) and componentDidCatch(error, errorInfo) and displaying a fallback UI component.
