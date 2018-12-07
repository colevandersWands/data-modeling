{ 

console.log('--- schema (given) ---');

  const player_schema =  {
    position: {type: 'string', required: true, _default: ''},
    number: {type: 'number', required: true, _default: 0}
  }

console.log('--- test objects (given) ---')

  // valid & invalid entry examples
  const valid_entry = {position: '', number: 0}
  const missing_number = {position: ''}
  const missing_position = {number: 0};
  const missing_both = {}
  const extra_field = {position: '', number: 0, age: 0}
  const invalid_position = {position: 0, number: 0}
  const invalid_number = {position: '', number: ''}
  const invalid_both = {position: 0, number: ''}


console.log('--- check for missing fields ---')
  
  // all schemaed fields in the entry must be of the right type
  //  invalidate if a required field is missing
  function missing_fields_loose(entry, schema) {
    let validity = false;

    for (let key in schema) {
      if (entry[key] === undefined  && schema[key].required) {
        validity = true;
        break;
      }
    }

    return validity
  }

  // entries must have all fields, of the right type, and no extra fields
  //  invalidate if a field is missing, required or not
  function missing_fields_strict(entry, schema) {
    let validity = false;

    for (let key in schema) {
      if (entry[key] === undefined) {
        validity = true;
        break;
      }
    }

    return validity
  }


console.log('--- check for extra fields ---')

  // loose validation doesn't care about extra fields

  // entries must have all fields, of the right type, and no extra fields
  //  invalidate if there is an extra field
  function extra_fields(entry, schema) {
    let validity = false;

    for (let property in entry) {
      if (schema[property] === undefined) {
        validity = true;
        break;
      }
    }

    return validity;
  }


console.log('--- validate existing entries ---')

  // both strategies agree, types need to be right
  function validate_fields(entry, schema) {
    let validity = false;

    for (let field in schema) {
      if (typeof entry[field] !== schema[field].type) {
        validity = true;
        break;
      }
    }

    return validity
  }


console.log('--- develop entry validators ---');

  // all schemaed fields in the entry must be of the right type
  //  invalidate if a required field is missing
  //  allow extra fields
  //  invalidate if a field is the wrong type
  function entry_is_valid_loose(entry, schema) {
    let validity = true;

    const missing_fields = missing_fields_loose(entry, schema);
    const invalid_fields = validate_fields(entry, schema);

    if (missing_fields || invalid_fields) {
      validity = false
    }

    return validity
  }

  // entries must have all fields, of the right type, and no extra fields
  //  invalidate if a field is missing, required or not
  //  invalidate if there are extra fields
  //  invalidate if a field is the wrong type
  function entry_is_valid_strict(entry, schema) {
    let validity = true;

    const missing_fields = missing_fields_strict(entry, schema);
    const extra_fields = extra_fields(entry, schema)
    const invalid_fields = validate_fields(entry, schema);

    if (missing_fields || invalid_fields || extra_fields) {
      validity = false
    }

    return validity
  }
  // run_tests

console.log('--- develop generalized entry validator ---')

  function validate_entry(entry, schema, strictly) {
    let validity;

    if (strictly) {
      validity = entry_is_valid_strict(entry, schema)
    } else {
      validity = entry_is_valid_loose(entry, schema)
    }

    return validity;
  }
  // run_tests








  // testing utils
  function run_tests(_target, _cases, _log) {
    for (let t_case of _cases) {
      let expected = t_case.expected;

      let actual;
      let msg;
      let log;
      if (_log) {
        log = _target(... t_case.args, true);
        actual = log.result;
      } else {
        actual = _target(... t_case.args, false);
      };

      let pass;
      if (typeof expected === 'object') {
        actual = JSON.stringify(actual);
        expected = JSON.stringify(expected);
        pass = actual === expected;
      } else {
        pass = actual === expected;
      };

      if (!pass && _log) {
        console.log(`    ${t_case.name}: \n` + 
            "actual: ", log, "\n" +
            `expected: {${typeof expected}, ${expected}}`);
      } else if (!pass) {
        console.log(`${t_case.name}: \n` + 
            `   actual: {${typeof actual}, ${actual}} \n` +
            `   expected: {${typeof expected}, ${expected}}`);
      };
    };
  };




}

