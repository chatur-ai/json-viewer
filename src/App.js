import { Box, Grid, grommet, Grommet, Header, Heading, Tab, Tabs, Text, TextArea, ThemeContext } from "grommet"
import { React, useReducer } from "react"
import { Fragment } from "react"
import { renderJsonCards, renderJsonTable } from "./utils"


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
        rows={['xxsmall', 'flex']}
        columns={['1/2', 'full']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'textView', start: [0, 1], end: [0, 1] },
          { name: 'jsonView', start: [1, 1], end: [1, 1] },
        ]}
        full
      >
        <Header gridArea="header" background="brand" pad="small">
          <Heading size="small">JSON Viewer</Heading>
          <Text size="xsmall">Made with ❤️ by chatur.ai</Text>
        </Header>
        <Box gridArea="textView" background="neutral-2" margin="small" round="xsmall">
          <TextArea placeholder="Enter JSON" value={state.textInput} onChange={event => dispatch({ type: "input_text", value: event.target.value })} fill resize={false} size="small" style={{ fontFamily: 'monospace' }} plain />
        </Box>
        <Box gridArea="jsonView" margin="small" gap="small">
          <Tabs alignSelf="start">
            <Tab title="Cards View">
              <Box>
                {state.jsonInput && renderJsonCards(state.jsonInput)}
              </Box>
            </Tab>
            <Tab title="Table View">
              <Box background="white" round="xsmall">
                {state.jsonInput && renderJsonTable(state.jsonInput)}
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    </Grommet >
  )
}

export default App
