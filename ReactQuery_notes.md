# REACT QUERY

## QUERY KEYS

### STRING

For Generic List/Index resources and Non-hierarchical resources

### ARRAY

For Hierarchical or nested resources and Queries with additional parameters
useQuery(['todo', 5, { preview: true }], ...)

The order of keys in object does not make difference.
Array items order matters!

## QUERY FUNCTIONS

Should return a promise.
To handle errors query functions MUST throw them.
Unlike 'axios' 'fetch' does not throw an error in HTTP request fails.
