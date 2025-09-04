from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from books.models import Book
from datetime import date

User = get_user_model()


class TestBookAPI(APITestCase):
    def setUp(self):
        # Create a user (with email login)
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

        # Create a book (linked to user)
        Book.objects.create(
            title="Test Book",
            author="Tester",
            published_date=date(2023, 1, 1),
            owner=self.user
        )

        # Get JWT token
        response = self.client.post('/api/accounts/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        self.assertEqual(response.status_code, 200)
        self.token = response.data['access']

        # Set Auth header
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_can_get_books(self):
        """
        Ensure we can get a collection of books.
        """
        response = self.client.get('/api/books/')
        print("Status:", response.status_code)
        print("Data:", response.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Test Book")

    def test_can_create_book(self):
        """
        Ensure we can create a new book object.
        """

        payload = {
            'title': 'New Book',
            'author': 'Jane Doe',
            'published_date': '2025-01-01',
        }

        response = self.client.post('/api/books/', payload, format='json')

        print("Create Book Response:", response.status_code, response.data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Book')
        self.assertEqual(response.data['author'], 'Jane Doe')
