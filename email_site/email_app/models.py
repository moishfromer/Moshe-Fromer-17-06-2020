from django.db import models


class Message(models.Model):
    sender = models.IntegerField()
    receiver = models.IntegerField()
    message = models.TextField()
    subject = models.CharField(max_length=1000)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
