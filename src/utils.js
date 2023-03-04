import { Text } from "grommet"
import { countBy, flatten, keys, map, mapObject, max, object, sortBy, uniq, values } from "underscore"

export const extractColumns = (data) => {
    const allKeys = uniq(flatten(map(data, datum => keys(datum))))
    const keyUsages = object(allKeys, map(allKeys, key => countBy(data, datum => datum[key] ? 'exists' : 'missing')))
    const maxKeyUsage = max(map(values(keyUsages), usage => usage['exists'] || 0))
    return map(allKeys, function (key) {
        return {
            property: key,
            header: <Text>{key}</Text>,
            search: false,
            sortable: true
        }
    })
}