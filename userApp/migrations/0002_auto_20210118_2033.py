# Generated by Django 3.1.4 on 2021-01-18 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10, verbose_name='Gender'),
        ),
    ]
