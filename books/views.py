from rest_framework import viewsets, permissions, filters
from .models import Book, BookNote
from .serializers import BookSerializer, BookNoteSerializer
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
        return Book.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BookNoteViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for user-specific book notes
    """
    serializer_class = BookNoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BookNote.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
