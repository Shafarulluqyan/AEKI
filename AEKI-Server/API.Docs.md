# 🚀 GET started here

List of available endpoints:
- POST /register
- POST /login
- GET /products
- GET /products/:id
- POST /products
- GET /categories
- PATCH /products/:id
- PUT /products/:id
- DELETE /products/:id

List of available endpoints for Customer:
- POST /pub/register
- POST /pub/login
- GET /pub/products
- GET /pub/products/:id
- GET /pub/bookmarks
- POST /pub/bookmarks

## Products

### Get All Products

Get all products.

**URL**: `GET /products`

**request**:
```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_
  - Body:
    ```json
    {
      "statusCode": 200,
      "products": [
        {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
        },
        ...
      ]
    }
    ```

### Get a Product

Get details of a specific product.

**URL**: `GET /products/:id`

**request**:
```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_

  - Body:

  ````js

    "message": "OK",
    "product": [
        {
            "id": 1,
            "name": "Meja Makan Kayu",
            "description": "Meja makan kayu solid dengan desain modern.",
            "price": 800000,
            "stock": 10,
            "imgUrl": "https://www.ikea.co.id/in/produk/meja-ruang-makan/meja-makan/ingo-ivar-spr-19097356",
            "categoryId": 1,
            "authorId": 2,
            "createdAt": "2023-10-02T13:12:39.837Z",
            "updatedAt": "2023-10-02T13:12:39.837Z"
        },]
        ```
  ````

### Create a Product

Create a new product.

**URL**: `POST /products`

**request**:
```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    "name": <string>,
    "description":<string>,
    "price":<integer>,
    "stock":<integer>,
    "imgUrl":<string>,
    "categoryId":<integer>,
    "authorId":<integer>
}

```

**Response**:

- _201 - Created_
  - Body:
    ```json
    {
      "statusCode": 201,
      "message": "Product created successfully"
    }
    ```

### Delete a Product

Delete a product.

**URL**: `DELETE /products/:id`

**request**:
```js
{
  "access_token": "string"
}
```

**Request**:
params

```js
{
    id:<integer>
}
```

**Response**:

- _200 - OK_
  - Body:
    ```js
    {
      message: " Product with id 8 has been deleted";
    }
    ```

## Categories

### Get All Categories

Get all categories.

**URL**: `GET /categories`

**Response**:

- _200 - OK_
  - Body:

```js
    {
    "message": "OK",
    "category": [
        {
            "id": 1,
            "name": "Meja",
            "createdAt": "2023-10-03T00:01:04.285Z",
            "updatedAt": "2023-10-03T00:01:04.285Z"
        },
        ...
    ]
}
```

## User Authentication

### Register

Register a new user.

**URL**: `POST /register`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String",
    "username": "String",
    "phoneNumber": "String",
    "address": "String",
    "role": "admin"
  }
  ```

**Response**:

- _201 - Created_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "Register successfully"
    }
    ```

### Login

Login a user.

**URL**: `POST /login`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String"
  }
  ```

**Response**:

- _200 - OK_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "login successfully"
    }
    ```

### Edit a Product

Edit a product.

**URL**: `patch /products/:id`

**request**:
```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    "name": <string>,
    "description":<string>,
    "price":<integer>,
    "stock":<integer>,
    "imgUrl":<string>,
    "categoryId":<integer>,
    "authorId":<integer>
}
```

**Response**:

- _201 - Created_
  - Body:
    ```json
    {
      "statusCode": 201,
      "message": "successfully updated product"
    }
    ```

### Edit status

Edit a status

**URL**: `put /products/:id`

**request**:
```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    status:id
}
```

**Response**:

- _201 - Created_
  - Body:
    ```json
    {
      "statusCode": 201,
      "message": "success edit brow"
    }
    ```

## Customer Section

### CustomerRegister

Register a new Customer.

**URL**: `POST /pub/register`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String",
  }
  ```

**Response**:

- _201 - Created_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "account with ${customer.email} success to create"
    }
    ```

### Customer Login

Login a Customer.

**URL**: `POST /pub/login`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String"
  }
  ```

**Response**:

- _200 - OK_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "access_token"
    }
    ```


### Get All Products

Get all products.

**URL**: `GET /pub/products`

**request**:
```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_
  - Body:
    ```json
    {
      "statusCode": 200,
      "products": [
        {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
        },
        ...
      ]
    }
    ```

### Get a Product

Get details of a specific product.

**URL**: `GET /pub/products/:id`

**request**:
```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_

  - Body:

  ````js

    "message": "OK",
    "product": [
        {
            "id": 1,
            "name": "Meja Makan Kayu",
            "description": "Meja makan kayu solid dengan desain modern.",
            "price": 800000,
            "stock": 10,
            "imgUrl": "https://www.ikea.co.id/in/produk/meja-ruang-makan/meja-makan/ingo-ivar-spr-19097356",
            "categoryId": 1,
            "authorId": 2,
            "createdAt": "2023-10-02T13:12:39.837Z",
            "updatedAt": "2023-10-02T13:12:39.837Z"
        },]
        ```
  ````

### Get All Bookmarks

Get all bookmarks.

**URL**: `GET /pub/bookmarks`

**request**:
```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_
  - Body:
    ```json
    {
      "statusCode": 200,
      "bookmarks": [
        {
          "ProductId": Integer,
          "CustomerId": Integer,
          "createdAt": Date,
          "updatedAt": Date
        },
        ...
      ]
    }
    ```

### Create a Bookamrk

Create a new bookmark.

**URL**: `POST /pub/bookmark`

**request**:
```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    "ProductId":<integer>,
    "CustomerId":<integer>
}

```

**Response**:

- _201 - Created_
  - Body:
    ```json
    {
      "statusCode": 201,
      "message": "Bookmark created successfully"
    }
    ```

## Global Error

response ( 500)

```js
{
      "statusCode": 201,
      "message": "Internal Server Error"
    }
```
