{
console.log('--- given a word problem ---')

  // word problem

console.log('--- write a schema & some examples ---')

  // schema
  // example entries

console.log('--- write a schema validator ---')

console.log('--- write a schema enforcer ---')

console.log('--- build a crud object for this data set ---')

  // ie.
  let model_object_simple = {
    data: {},
    next_id: 0,
    create: function(new_entry) {
        // add to data
      },
    read: function(id) {/* return the item */},
    update: function(id, new_entry) {
        // update in data
      },
    remove: function(id) {}
  }

console.log('--- add in schema validation & enforcement ---')
  
  // ie.
  let model_object_secure = {
    data: {},
    next_id: 0,
    schema: {},
    validate: function () {},
    enforce: function() {},
    create: function(new_entry) {
        // validate
        // enforce
        // add to data
      },
    read: function(id) {/* return the item */},
    update: function(id, new_entry) {
        // validate
        // enforce
        // update in data
      },
    remove: function(id) {}
  }

console.log('--- run behavioral tests ---')
