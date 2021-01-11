from django.db import models
from userApp.models import Charity
from django.conf import settings 
 
class Activity(models.Model):
    name           = models.CharField(max_length=120)
    description    = models.CharField(max_length=120)
    date           = models.DateField()
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)
    user     = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='charitiy_activities', on_delete=models.CASCADE) 
    #activity_volunteer FROM Volunterring   
    
    def __repr__(self):
        return f'<Activity: ID:{self.id} Name:{self.name} Description:{self.description} Date:{self.date} Charity ID:{self.charity_id}>'

class Volunteering(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user_volunteer", on_delete = models.CASCADE)
    activity    = models.ForeignKey(Activity, related_name="activity_volunteer", on_delete = models.CASCADE)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'<Volunteer: ID:{self.id} User ID:{self.user} Activity:{self.activity.name}>'
