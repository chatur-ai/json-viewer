import { Box, Grid, grommet, Grommet, Header, Heading, Text, TextArea } from "grommet"
import { React, useReducer } from "react"
import { renderJsonCards } from "./utils"


function reducer(state, action) {
  switch (action.type) {
    case 'input_text': {
      try {
        const parsedJson = JSON.parse(action.value)
        return {
          textInput: action.value,
          jsonInput: parsedJson,
          errors: []
        }
      } catch (e) {
        return {
          textInput: action.value,
          jsonInput: undefined,
          errors: ["Please input a valid JSON string"]

        }
      }
    }
    default: return state
  }
}

const initialState = {
  textInput: undefined,
  jsonInput: undefined,
  viewCards: true,
  viewTable: false,
  errors: []
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Grommet full theme={grommet} background="light-2">
      <Grid
        rows={['xxsmall', 'auto']}
        columns={['1/2', '1/2']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'textView', start: [0, 1], end: [0, 1] },
          { name: 'jsonView', start: [1, 1], end: [1, 1] },
        ]}
        fill
      >
        <Header gridArea="header" background="brand" pad="small">
          <Heading size="small">JSON Viewer</Heading>
          <Text size="xsmall">Made with ❤️ by chatur.ai</Text>
        </Header>
        <Box gridArea="textView" background="neutral-2" margin="small" round="xsmall">
          <TextArea placeholder="Enter JSON" value={state.textInput} onChange={event => dispatch({ type: "input_text", value: event.target.value })} fill resize={false} size="small" style={{ fontFamily: 'monospace' }} plain />
        </Box>
        <Box gridArea="jsonView" margin="small">
          {state.jsonInput && renderJsonCards(state.jsonInput)}
        </Box>
      </Grid>
    </Grommet >
  )
}

export default App
