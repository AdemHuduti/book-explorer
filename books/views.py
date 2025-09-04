from rest_framework import viewsets, permissions, filters
from .models import Book
from .serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import BookFilter

# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    """
        Handles CRUD operations for books
    """
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = BookFilter

    filterset_fields = ['title', 'author', 'published_date']

    ordering_fields = ['title', 'published_date', 'author']
    ordering = ['title']

    def get_queryset(self):
        # Each user sees only their book
        # return Book.objects.filter(owner=self.request.user)
        return Book.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
