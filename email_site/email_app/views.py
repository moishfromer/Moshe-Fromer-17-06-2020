from django.db.models import Q
from rest_framework import viewsets
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = MessageSerializer

    def get_queryset(self):

        queryset = Message.objects.all()

        if self.action == 'list':
            user_id = self.request.query_params.get('user_id')
            queryset = queryset.filter(Q(sender=user_id) | Q(receiver=user_id))

        return queryset
