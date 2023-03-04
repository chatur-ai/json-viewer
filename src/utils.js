import { Text } from "grommet"
import { flatten, keys, map, uniq } from "underscore"

const extractKeys = (datum) => {
    return keys(datum)
}

export const extractColumns = (data) => {
    const allKeys = uniq(flatten(map(data, extractKeys)))
    return map(allKeys, function (key) {
        return {
            property: key,
            header: <Text>{key}</Text>,
            search: false,
            sortable: true
        }
    })
}