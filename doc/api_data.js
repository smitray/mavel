define({ "api": [
  {
    "type": "put",
    "url": "/api/auth/",
    "title": "Update auth module",
    "name": "Get_other",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "{\n  \"Authorization\": \"Bearer JWT\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"john@doe.com\",\n  \"password\": \"test123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"auth\": [Object]\n  },\n  \"message\": \"auth updated successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Email or Username exists",
          "content": "HTTP/1.1 404 No record found",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 422 Unprocessable entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/auth/controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/auth/local",
    "title": "Local Signup and Login",
    "name": "Local_Authentication",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "accType",
            "defaultValue": "user",
            "description": "<p>User's account type</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "signp",
            "defaultValue": "false",
            "description": "<p>To toggle between signup and login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Signup",
          "content": "{\n  \"name\": \"John Doe\",\n  \"username\": \"johndoe\",\n  \"password\": \"test1234\",\n  \"email\": \"john@doe.com\",\n  \"accType\": \"admin\",\n  \"signup\": true\n}",
          "type": "json"
        },
        {
          "title": "Login",
          "content": "{\n  \"username\": \"johndoe\", //Username or email as value but key should be \"username\"\n  \"password\": \"test1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"token\": \"Bearer JWT token\"\n  },\n  \"message\": \"Loggedin successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Email or Username exists",
          "content": "HTTP/1.1 409 Record conflict",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        },
        {
          "title": "Wrong form key",
          "content": "HTTP/1.1 422 Unprocessable entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/auth/controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/auth/social",
    "title": "Social Signup and Login",
    "name": "Social_Authentication",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scId",
            "description": "<p>Social network ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scToken",
            "description": "<p>Social network token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scType",
            "description": "<p>Name of the social network</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"John Doe\",\n  \"username\": \"johndoe\",\n  \"email\": \"john@doe.com\",\n  \"scId\": \"123456789\",\n  \"scToken\": \"123456789\",\n  \"scType\": \"facebook\" // Or twitter / google\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"token\": \"Bearer JWT token\"\n  },\n  \"message\": \"Loggedin successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Email or Username exists",
          "content": "HTTP/1.1 409 Record conflict",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        },
        {
          "title": "Wrong form key",
          "content": "HTTP/1.1 422 Unprocessable entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/auth/controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/api/auth",
    "title": "Get my details",
    "name": "Get_me",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "{\n  \"Authorization\": \"Bearer JWT\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"user\": [Object]\n  },\n  \"message\": \"User details fetched successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Email or Username exists",
          "content": "HTTP/1.1 404 No record found",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/auth/controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/auth/:id",
    "title": "Get other's details",
    "name": "Get_other",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "{\n  \"Authorization\": \"Bearer JWT\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"user\": [Object]\n  },\n  \"message\": \"User details fetched successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Email or Username exists",
          "content": "HTTP/1.1 404 No record found",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/auth/controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/files/delete",
    "title": "File delete",
    "name": "Delete_file",
    "group": "Utility",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "{\n  \"Authorization\": \"Bearer JWT\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>File / Files (Use form data)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"fileId\": \"file\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"files\": {\n      \"filename\": \"file name\",\n      \"permalink\": \"link of the file\",\n      \"_id\": \"file ID\"\n    }\n  },\n  \"message\": \"File deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        },
        {
          "title": "Wrong form key",
          "content": "HTTP/1.1 422 Unprocessable entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/files/controller.js",
    "groupTitle": "Utility"
  },
  {
    "type": "post",
    "url": "/api/files",
    "title": "File upload",
    "name": "Upload_file",
    "group": "Utility",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "{\n  \"Authorization\": \"Bearer JWT\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "docs",
            "description": "<p>File / Files (Use form data)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"docs\": \"file\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"success\": 1,\n  \"data\": {\n    \"files\": {\n      \"filename\": \"file name\",\n      \"permalink\": \"link of the file\",\n      \"_id\": \"file ID\"\n    }\n  },\n  \"message\": \"All files uploaded\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Server error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Wrong credentials",
          "content": "HTTP/1.1 401 Not authorized",
          "type": "json"
        },
        {
          "title": "Wrong form key",
          "content": "HTTP/1.1 422 Unprocessable entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server/app/modules/files/controller.js",
    "groupTitle": "Utility"
  }
] });
