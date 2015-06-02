'use strict';

var _ = require('lodash');
var google = require('googleapis');

module.exports = {


  friendlyName: 'Authorize',


  description: 'Get authorization tokens',


  cacheable: true,


  sync: false,


  idempotent: false,


  inputs: {
    email: {
      example: 'service-account-email@developer.gserviceaccount.com',
      description: 'Service account email',
      required: true
    },

    keyFile: {
      example: 'path/to/key.pem',
      description: 'Path to your generated key.pem'
    },

    key: {
      example: 'keyContent',
      description: 'Contents of private_key.pem if you want to load the pem file yourself. (do not use the path parameter above if using this param)'
    },

    scopes: {
      example: ['https://www.googleapis.com/auth/drive.readonly'],
      description: 'Scopes can be specified either as an array or as a single, space-delimited string',
      typeclass: 'array'
    },

    impersonateEmail: {
      example: 'subject-account-email@example.com',
      description: 'User to impersonate (leave empty if no impersonation needed)'
    }
  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    }

  },


  fn: function(inputs, exits) {
    var authClient = new google.auth.JWT(
      inputs.email,
      inputs.keyFile,
      inputs.key || undefined,
      inputs.scopes || [],
      inputs.impersonateEmail || undefined);

    authClient.authorize(function(err, tokens) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(tokens);
    });
  }

};
