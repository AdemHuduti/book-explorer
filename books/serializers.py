from rest_framework import serializers
from .models import Book, BookNote


class BookSerializer(serializers.ModelSerializer):
    notes_count = serializers.IntegerField(source='get_notes_count', read_only=True)
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'published_date', 'notes_count']


class BookNoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    book_title = serializers.ReadOnlyField(source='book.title')

    class Meta:
        model = BookNote
        fields = ['id', 'book', 'book_title', 'user', 'note', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at', 'book_title']