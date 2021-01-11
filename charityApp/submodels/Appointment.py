from django.db import models
from userApp.models import User, Charity, Category
 
class BookAppointment(models.Model):
    size            = models.CharField(max_length = 40)
    amount          = models.CharField(max_length = 40)
    date            = models.DateField()
    time            = models.TimeField() 
    user            = models.ForeignKey(User, related_name="user_appointment", on_delete = models.CASCADE)
    charity         = models.ForeignKey(Charity, related_name="charities_appointment", on_delete = models.CASCADE)
    category        = models.ForeignKey(Category, related_name="categories_appointment", on_delete = models.CASCADE)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    
    def __repr__(self):
        return f'<Book Appointment: ID:{self.id} size:{self.size} amount:{self.amount} date:{self.date} time:{self.time} user:{self.user} charity:{self.charity}>'
