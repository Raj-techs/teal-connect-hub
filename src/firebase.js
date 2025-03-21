const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "womenpro-a78bb",
  "private_key_id": "83b2052c43fd0a681af7d5cd19a3d89b290aef07",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAb+qJqoWvA4SU\na/qpO1/wB3O7Us8TnxUHTzOTiTzG0vZcYoqDgZthssLuXSSbGHEMTitVNZ31H3NV\nuE6b3IBhuQzwiO3VpEyDXKUEZZNHpz9seOWXT01kBxTNiMX90s/F5DrvorhiJDcz\n7nIZ5MDl7G//tSjOQfYSG4LU5Rr95H4pE3FYlg/O7IMR/c6NCHlb6RAn+vd83aZy\n/HPFcBe0ZYtkg37nflbRKSPHu2mC+x04rlYNOuY8424mxIGSGtAXVJVuXbPLjt00\ntq6CCfGx1g5MuK5fwwSsK73TMy0KZSOMSjcyktfXNJooApW241Zr7YzGysvVaOeb\nzZhYmdIfAgMBAAECggEACUsxmdqoU5AvoXybiC7/AaUifW83SZya7XwkotRaB173\nf47rK9G6stu1/Vp2b562qvnFe8geOLd/OipJPzUr5n+DTl4wLYUehHbMQ2uY0tLG\nReAkdAvKhYrjNTZZtY0uWqgDAdrE3XyGEmLkLZ4pUMSVkVU3wzC9VRkkcIRS3hfk\nkbRDxbFBTLAzgcKaSOBfyTC+C48q7elywHZTxc2QjED7NWvh3dbTydVRafjbUFb1\nwqGT3IvSVVSKRPSyVeCI2Xb85jn2chq5zhd7jr8UuABv/p+0Cz6/VtibYSV57tnE\nUOLmfCe6KiXNYw8D+MdG9t99r617D96IBPsPHF8KNQKBgQDkacTdLlajs3xtCHtu\nauCRuXdD+4+qCHlYOeNx5Md87Y/YNYHuEXyl+lQu6hrKzYNj3bvNQc1bgqZXJSUL\nPFOouChn1FrB6/UXBR5YoxbnEwESHDchcWJmTJVKje7a1Z4Z3ZiYYY3V3Gw4pgxn\nMtBFreYdzRZL4hQG3SZ/wZzmiwKBgQDXrdFHMWdSdLk6abfBDE4LNZli8AojySyc\n8dvAordQHOg7qfSsk6jU2eFuy9wojnn9HngBsf/7C1deViv2mZ2/gtasJgu5CDrm\nD2WaKEYkgQ4B3tsQu5WKhHEjJPlm1DRJuoidju4HC3zRaUa2rGHVQe1YHuOmn9JB\nEwntNdQJPQKBgF3mVXYQHLIDkX1JZWTJLzT5J9ycyDzAaxIoCibCRHhJOT9LD/UM\n309kj8MRnp4Mypz9hL0m9gNOvI9Kx+XMkR/lRUcZ942NMR6bjhQmR74LA/+r9cYb\n1LX1edJCcxUniG1dueO7BxIKIbtQF/082H4stVM/ApGDiXQg6jjPIW9tAoGAIFfs\nnmSGPhNLA7t+1vBlc8Dh87hTjPJKQm7yqXy9SMJNAUWHb6nlE6Zo7BieN2bGXHMJ\nRBfRb3BP9dGuXhjDU0jnsIE0GNdnHcEJV4jam/bOhvFIoMXAszkRTlfpHsaL4NKc\nUiRxBZVvbmf/Nr27HiP419IqCX7GJQQZ5PzBg3ECgYEAze8jdnk5XRxfB5ZIZhTt\nrNyDgUq9tEMyX/cpjPqh5oatOHcXdaXy4bkHB4sqG5raaa3CIe89PGxayprCSAdY\nsdbKsRiAjlf9BqnlIzX5Ijp7JOEoThyH/9RRxq/azSHOswvF5W64Gc+/Jh07cWzK\n1I7XJsUJDQaY+r1bgm3YzI8=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@womenpro-a78bb.iam.gserviceaccount.com",
  "client_id": "106861334484583606748",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40womenpro-a78bb.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
