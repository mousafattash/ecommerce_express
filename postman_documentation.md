# E-commerce Express API Documentation

This document provides a comprehensive guide to the E-commerce Express API endpoints for use with Postman or any other API testing tool.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register a new user
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "role": "user"
      },
      "token": "jwt_token"
    }
  }
  ```

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate a user and get a JWT token
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      },
      "token": "jwt_token"
    }
  }
  ```

### Categories

#### Get all categories
- **URL**: `/category`
- **Method**: `GET`
- **Description**: Retrieve all product categories
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "category_id",
        "name": "Electronics",
        "description": "Electronic products"
      }
    ]
  }
  ```

#### Get category by ID
- **URL**: `/category/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific category by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "category_id",
      "name": "Electronics",
      "description": "Electronic products"
    }
  }
  ```

#### Create category (Admin only)
- **URL**: `/category`
- **Method**: `POST`
- **Description**: Create a new product category
- **Request Body**:
  ```json
  {
    "name": "Electronics",
    "description": "Electronic products"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "category_id",
      "name": "Electronics",
      "description": "Electronic products"
    }
  }
  ```

#### Update category (Admin only)
- **URL**: `/category/:id`
- **Method**: `PUT`
- **Description**: Update an existing category
- **Request Body**:
  ```json
  {
    "name": "Updated Electronics",
    "description": "Updated description"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "category_id",
      "name": "Updated Electronics",
      "description": "Updated description"
    }
  }
  ```

#### Delete category (Admin only)
- **URL**: `/category/:id`
- **Method**: `DELETE`
- **Description**: Delete a category
- **Response**:
  ```json
  {
    "success": true,
    "message": "Category deleted successfully"
  }
  ```

### Products

#### Get all products
- **URL**: `/product`
- **Method**: `GET`
- **Description**: Retrieve all products with optional filtering
- **Query Parameters**:
  - `category`: Filter by category ID
  - `search`: Search by product name
  - `minPrice`: Minimum price
  - `maxPrice`: Maximum price
  - `sort`: Sort by field (price, createdAt, etc.)
  - `order`: Sort order (asc, desc)
  - `page`: Page number for pagination
  - `limit`: Items per page
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "products": [
        {
          "_id": "product_id",
          "name": "Product Name",
          "description": "Product description",
          "price": 99.99,
          "stock": 100,
          "category": "category_id",
          "images": ["image_url1", "image_url2"]
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "totalPages": 5,
        "totalItems": 50
      }
    }
  }
  ```

#### Get product by ID
- **URL**: `/product/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific product by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "stock": 100,
      "category": "category_id",
      "images": ["image_url1", "image_url2"]
    }
  }
  ```

#### Create product (Admin only)
- **URL**: `/product`
- **Method**: `POST`
- **Description**: Create a new product
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 100,
    "category": "category_id",
    "images": ["image_url1", "image_url2"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "stock": 100,
      "category": "category_id",
      "images": ["image_url1", "image_url2"]
    }
  }
  ```

#### Update product (Admin only)
- **URL**: `/product/:id`
- **Method**: `PUT`
- **Description**: Update an existing product
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "description": "Updated description",
    "price": 149.99,
    "stock": 50,
    "category": "category_id",
    "images": ["image_url1", "image_url2"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "product_id",
      "name": "Updated Product Name",
      "description": "Updated description",
      "price": 149.99,
      "stock": 50,
      "category": "category_id",
      "images": ["image_url1", "image_url2"]
    }
  }
  ```

#### Delete product (Admin only)
- **URL**: `/product/:id`
- **Method**: `DELETE`
- **Description**: Delete a product
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully"
  }
  ```

### Cart

#### Get user's cart
- **URL**: `/cart`
- **Method**: `GET`
- **Description**: Retrieve the current user's cart
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "cart_id",
      "user": "user_id",
      "items": [
        {
          "product": {
            "_id": "product_id",
            "name": "Product Name",
            "price": 99.99,
            "images": ["image_url1"]
          },
          "quantity": 2
        }
      ],
      "total": 199.98
    }
  }
  ```

#### Add item to cart
- **URL**: `/cart`
- **Method**: `POST`
- **Description**: Add a product to the cart
- **Request Body**:
  ```json
  {
    "productId": "product_id",
    "quantity": 2
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "cart_id",
      "user": "user_id",
      "items": [
        {
          "product": {
            "_id": "product_id",
            "name": "Product Name",
            "price": 99.99,
            "images": ["image_url1"]
          },
          "quantity": 2
        }
      ],
      "total": 199.98
    }
  }
  ```

#### Update cart item quantity
- **URL**: `/cart/:productId`
- **Method**: `PATCH`
- **Description**: Update the quantity of a product in the cart
- **Request Body**:
  ```json
  {
    "quantity": 3
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "cart_id",
      "user": "user_id",
      "items": [
        {
          "product": {
            "_id": "product_id",
            "name": "Product Name",
            "price": 99.99,
            "images": ["image_url1"]
          },
          "quantity": 3
        }
      ],
      "total": 299.97
    }
  }
  ```

#### Remove item from cart
- **URL**: `/cart/:productId`
- **Method**: `DELETE`
- **Description**: Remove a product from the cart
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "cart_id",
      "user": "user_id",
      "items": [],
      "total": 0
    }
  }
  ```

#### Clear cart
- **URL**: `/cart`
- **Method**: `DELETE`
- **Description**: Remove all items from the cart
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "cart_id",
      "user": "user_id",
      "items": [],
      "total": 0
    }
  }
  ```

### Orders

#### Get user's orders
- **URL**: `/order`
- **Method**: `GET`
- **Description**: Retrieve all orders for the current user
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "order_id",
        "user": "user_id",
        "items": [
          {
            "product": {
              "_id": "product_id",
              "name": "Product Name",
              "price": 99.99
            },
            "quantity": 2,
            "price": 99.99
          }
        ],
        "total": 199.98,
        "status": "pending",
        "shippingAddress": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "paymentMethod": "credit_card",
        "createdAt": "2023-04-24T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get order by ID
- **URL**: `/order/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific order by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "order_id",
      "user": "user_id",
      "items": [
        {
          "product": {
            "_id": "product_id",
            "name": "Product Name",
            "price": 99.99
          },
          "quantity": 2,
          "price": 99.99
        }
      ],
      "total": 199.98,
      "status": "pending",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "paymentMethod": "credit_card",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Create order
- **URL**: `/order`
- **Method**: `POST`
- **Description**: Create a new order from the user's cart
- **Request Body**:
  ```json
  {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "order_id",
      "user": "user_id",
      "items": [
        {
          "product": {
            "_id": "product_id",
            "name": "Product Name",
            "price": 99.99
          },
          "quantity": 2,
          "price": 99.99
        }
      ],
      "total": 199.98,
      "status": "pending",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "paymentMethod": "credit_card",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Update order status (Admin only)
- **URL**: `/order/:id/status`
- **Method**: `PATCH`
- **Description**: Update the status of an order
- **Request Body**:
  ```json
  {
    "status": "shipped"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "order_id",
      "user": "user_id",
      "items": [...],
      "total": 199.98,
      "status": "shipped",
      "shippingAddress": {...},
      "paymentMethod": "credit_card",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

### Coupons

#### Get all coupons
- **URL**: `/coupon`
- **Method**: `GET`
- **Description**: Retrieve all coupons
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "coupon_id",
        "code": "SUMMER2023",
        "discount": 20,
        "type": "percentage",
        "expiryDate": "2023-08-31T23:59:59.999Z",
        "isActive": true
      }
    ]
  }
  ```

#### Get coupon by code
- **URL**: `/coupon/:code`
- **Method**: `GET`
- **Description**: Retrieve a specific coupon by code
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "coupon_id",
      "code": "SUMMER2023",
      "discount": 20,
      "type": "percentage",
      "expiryDate": "2023-08-31T23:59:59.999Z",
      "isActive": true
    }
  }
  ```

#### Create coupon (Admin only)
- **URL**: `/coupon`
- **Method**: `POST`
- **Description**: Create a new coupon
- **Request Body**:
  ```json
  {
    "code": "SUMMER2023",
    "discount": 20,
    "type": "percentage",
    "expiryDate": "2023-08-31T23:59:59.999Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "coupon_id",
      "code": "SUMMER2023",
      "discount": 20,
      "type": "percentage",
      "expiryDate": "2023-08-31T23:59:59.999Z",
      "isActive": true
    }
  }
  ```

#### Update coupon (Admin only)
- **URL**: `/coupon/:id`
- **Method**: `PUT`
- **Description**: Update an existing coupon
- **Request Body**:
  ```json
  {
    "discount": 25,
    "expiryDate": "2023-09-30T23:59:59.999Z",
    "isActive": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "coupon_id",
      "code": "SUMMER2023",
      "discount": 25,
      "type": "percentage",
      "expiryDate": "2023-09-30T23:59:59.999Z",
      "isActive": true
    }
  }
  ```

#### Delete coupon (Admin only)
- **URL**: `/coupon/:id`
- **Method**: `DELETE`
- **Description**: Delete a coupon
- **Response**:
  ```json
  {
    "success": true,
    "message": "Coupon deleted successfully"
  }
  ```

### Reviews

#### Get product reviews
- **URL**: `/review/product/:productId`
- **Method**: `GET`
- **Description**: Retrieve all reviews for a specific product
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "review_id",
        "user": {
          "_id": "user_id",
          "name": "John Doe"
        },
        "product": "product_id",
        "rating": 5,
        "comment": "Great product!",
        "createdAt": "2023-04-24T12:00:00.000Z"
      }
    ]
  }
  ```

#### Create review
- **URL**: `/review`
- **Method**: `POST`
- **Description**: Create a new review for a product
- **Request Body**:
  ```json
  {
    "productId": "product_id",
    "rating": 5,
    "comment": "Great product!"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "review_id",
      "user": "user_id",
      "product": "product_id",
      "rating": 5,
      "comment": "Great product!",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Update review
- **URL**: `/review/:id`
- **Method**: `PUT`
- **Description**: Update an existing review
- **Request Body**:
  ```json
  {
    "rating": 4,
    "comment": "Updated comment"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "review_id",
      "user": "user_id",
      "product": "product_id",
      "rating": 4,
      "comment": "Updated comment",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Delete review
- **URL**: `/review/:id`
- **Method**: `DELETE`
- **Description**: Delete a review
- **Response**:
  ```json
  {
    "success": true,
    "message": "Review deleted successfully"
  }
  ```

### Admin

#### Get all users (Admin only)
- **URL**: `/admin/users`
- **Method**: `GET`
- **Description**: Retrieve all users
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "role": "user",
        "createdAt": "2023-04-24T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get user by ID (Admin only)
- **URL**: `/admin/users/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific user by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "user",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Update user role (Admin only)
- **URL**: `/admin/users/:id/role`
- **Method**: `PATCH`
- **Description**: Update a user's role
- **Request Body**:
  ```json
  {
    "role": "admin"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "admin",
      "createdAt": "2023-04-24T12:00:00.000Z"
    }
  }
  ```

#### Get dashboard statistics (Admin only)
- **URL**: `/admin/dashboard`
- **Method**: `GET`
- **Description**: Retrieve dashboard statistics
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalUsers": 100,
      "totalProducts": 50,
      "totalOrders": 200,
      "totalRevenue": 15000,
      "recentOrders": [...],
      "topProducts": [...]
    }
  }
  ```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Importing to Postman

To import this API into Postman:

1. Create a new collection in Postman
2. Create folders for each module (Auth, Category, Product, Cart, Order, Coupon, Review, Admin)
3. Add requests for each endpoint
4. Set up environment variables:
   - `baseUrl`: The base URL of your API (e.g., `http://localhost:3000/api`)
   - `token`: Your JWT token after login

5. For authenticated requests, add the Authorization header:
   ```
   Authorization: Bearer {{token}}
   ```

6. For requests that require admin privileges, make sure to use an admin account to obtain the token. 