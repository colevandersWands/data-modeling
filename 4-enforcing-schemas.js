{

console.log('--- given a word problem ---')

  // word problem

console.log('--- write a schema & some examples ---')

  // schema
  // example entries



console.log('--- enforce extra properties ---')

  // only strict cares about this
  function enforce_extra(entry, schema) {
    let new_entry = Object.assign({}, entry);

    for (let prop in entry) {
      if (schema[prop] === undefined) {
        delete new_entry[prop]
      }
    }

    return new_entry;
  }

console.log('--- enforce existing properties ---')

  function validate_props(entry, schema) {
    let new_entry = Object.assign({}, entry);

    for (let prop in entry) {
      if (typeof entry[prop] !== schema[prop].type) {
        new_entry[prop] = schema[prop]._default
      }
    }
  }

console.log('--- enforce missing properties ---')

  // replace all missing props
  function enforce_missing_strict(entry, schema) {
    let new_entry = Object.assign({}, entry);

    for (let prop in schema) {
      if (entry[prop] === undefined) {
        new_entry[prop] = schema[prop]._default
      }
    }

    return new_entry
  }

  // replace missing & required props
  function enforce_missing_loose(entry, schema) {
    let new_entry = Object.assign({}, entry);

    for (let prop in schema) {
      if (entry[prop] === undefined && schema[prop].required === true) {
        new_entry[prop] = schema[prop]._default
      }
    }

    return new_entry
  }

console.log('--- build separate enforcers ---')
  
  function enforce_strict(entry, schema) {
    const new_entry = Object.assign({}, entry);

    const no_extras = enforce_extra(new_entry);
    const valid_props = validate_props(no_extras);
    const no_missing = enforce_missing_strict(no_extras);

    return no_missing;
  }

  function enforce_loose(entry, schema) {
    const new_entry = Object.assign({}, entry);

    const valid_props = validate_props(no_extras);
    const no_missing = enforce_missing_loose(no_extras);

    return no_missing;
  }


console.log('--- build enforcement function ---');

  function enforce_schema(entry, schema, strictly) {
    
    let new_entry

    if (strictly) {
      new_entry = enforce_strict(entry, schema);
    } else {
      new_entry = enforce_loose(entry, schema);
    }


    return new_entry

  }



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


  function validate_entry(entry, schema, strictly) {
    let validity;

    if (strictly) {
      validity = entry_is_valid_strict(entry, schema)
    } else {
      validity = entry_is_valid_loose(entry, schema)
    }

    return validity;
  
    function entry_is_valid_loose(entry, schema) {
      let validity = true;

      const missing_fields = missing_fields_loose(entry, schema);
      const invalid_fields = validate_fields(entry, schema);

      if (missing_fields || invalid_fields) {
        validity = false
      }

      return validity
    }
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
  }

}

