Backend API Documentation for Account Dashboard
Base URL
https://api.yourdomain.com/v1

All endpoints require JWT authentication in the Authorization header:

Authorization: Bearer <access_token>
1. User Profile Endpoints
GET /user/profile
Description: Fetch user profile information

Response:

json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "David",
    "lastName": "Kamau",
    "email": "david.kamau@gmail.com",
    "phone": "0712345678",
    "createdAt": "2023-05-15T10:30:00Z",
    "updatedAt": "2024-02-20T08:45:00Z"
  }
}
PUT /user/profile
Description: Update user profile information

Request Body:

json
{
  "firstName": "David",
  "lastName": "Kamau",
  "email": "david.kamau@gmail.com",
  "phone": "0712345678"
}
Response:

json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "David",
    "lastName": "Kamau",
    "email": "david.kamau@gmail.com",
    "phone": "0712345678",
    "updatedAt": "2024-02-21T09:15:00Z"
  }
}
2. Orders Endpoints
GET /user/orders
Description: Fetch user's order history

Query Parameters:

status (optional): Filter by order status (pending, shipped, delivered, cancelled)

Response:

json
{
  "success": true,
  "data": [
    {
      "id": "order_456",
      "orderNumber": "1234",
      "date": "2024-02-15T14:30:00Z",
      "status": "delivered",
      "total": 1299.00,
      "items": [
        {
          "id": "item_789",
          "name": "Maasai Beaded Bracelet",
          "price": 1299.00,
          "quantity": 1,
          "imageUrl": "/images/bracelet.jpg"
        }
      ],
      "shippingAddress": "addr_123"
    },
    {
      "id": "order_457",
      "orderNumber": "1198",
      "date": "2024-02-10T11:20:00Z",
      "status": "shipped",
      "total": 1700.00,
      "items": [
        {
          "id": "item_790",
          "name": "Kikoy Beach Towel",
          "price": 850.00,
          "quantity": 2,
          "imageUrl": "/images/towel.jpg"
        }
      ],
      "shippingAddress": "addr_124"
    }
  ]
}
3. Addresses Endpoints
GET /user/addresses
Description: Fetch user's saved addresses

Response:

json
{
  "success": true,
  "data": [
    {
      "id": "addr_123",
      "label": "Home",
      "isDefault": true,
      "line1": "Block C, Apartment 4B",
      "line2": "Lavington Green Estate",
      "city": "Nairobi",
      "postalCode": "00100",
      "country": "Kenya",
      "phone": "0712345678"
    },
    {
      "id": "addr_124",
      "label": "Work",
      "isDefault": false,
      "line1": "Westlands Business Center",
      "line2": "3rd Floor, Suite 305",
      "city": "Nairobi",
      "postalCode": "00200",
      "country": "Kenya",
      "phone": "0723456789"
    }
  ]
}
POST /user/addresses
Description: Add a new address

Request Body:

json
{
  "label": "Work",
  "line1": "Westlands Business Center",
  "line2": "3rd Floor, Suite 305",
  "city": "Nairobi",
  "postalCode": "00200",
  "country": "Kenya",
  "phone": "0723456789",
  "isDefault": false
}
4. Payment Methods Endpoints
GET /user/payment-methods
Description: Fetch user's saved payment methods

Response:

json
{
  "success": true,
  "data": [
    {
      "id": "pm_123",
      "type": "VISA",
      "last4": "4567",
      "expiry": "05/26",
      "name": "David Kamau",
      "isDefault": true
    },
    {
      "id": "pm_124",
      "type": "M-PESA",
      "phone": "0712345678",
      "name": "David Kamau",
      "isDefault": false
    }
  ]
}
Error Responses
All endpoints return consistent error responses:

401 Unauthorized:

json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
400 Bad Request:

json
{
  "success": false,
  "error": "ValidationError",
  "message": "Invalid phone number format",
  "details": {
    "phone": "Phone number must be 10 digits starting with 07"
  }
}
404 Not Found:

json
{
  "success": false,
  "error": "NotFound",
  "message": "User not found"
}
500 Internal Server Error:

json
{
  "success": false,
  "error": "ServerError",
  "message": "Internal server error"
}
Pagination
For endpoints that may return large datasets (like orders), implement pagination:

Request:

GET /user/orders?page=1&limit=10
Response:

json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
Notes for Implementation
Authentication:

All endpoints must verify the JWT token

Ensure users can only access their own data

Validation:

Validate all input data (especially for profile updates and new addresses)

Return detailed validation errors when applicable

Data Consistency:

When setting an address/payment method as default, ensure previous default is unset

Maintain referential integrity (e.g., don't allow deletion of addresses used in orders)

Performance:

Consider caching frequently accessed data like user profiles

Implement proper indexing for query performance

Security:

Never return sensitive data like full credit card numbers

Implement rate limiting to prevent abuse