from django.db import models
from django.conf import settings

class CharityLocation(models.Model):
    longitude   = models.CharField(max_length=120)
    latitude    = models.CharField(max_length=120)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    user        = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.latitude 
    
    @property
    def charity_name(self):
        if self.user.is_charity:
            return self.user.charity.name
        else:
            return ''
       # return f'<Charity Location: ID:{self.id} Longitude:{self.longitude} Latitude:{self.latitude} Charity ID:{self.charity_id}>'