from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BookNoteViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'notes', BookNoteViewSet, basename='booknote')


urlpatterns = [
    path('', include(router.urls)),
]
