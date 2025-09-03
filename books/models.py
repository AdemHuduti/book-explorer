from django.db import models
from django.conf import settings

# Create your models here.


class Book(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, related_name="books")

    title = models.CharField(max_length=200)
    name = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    published_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)
