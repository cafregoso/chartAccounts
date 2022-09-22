from django.db import models

# Create your models here.

class Chart(models.Model):

    AcctType = models.CharField(
        max_length= 30,
        verbose_name='Account Type'
    )

    Account = models.CharField(
        max_length= 10,
        unique= True,
        verbose_name= 'Account Number',
    )

    Description = models.CharField(
        max_length= 150,
        verbose_name= 'Description',
    )

    Department = models.CharField(
        max_length= 50,
        verbose_name= 'Department',
    )

    TypicalBal = models.CharField(
        max_length= 5,
        verbose_name= 'Typical Balance'
    )

    DebitOffset = models.CharField(
        max_length= 30,
        default= None,
        null= True,
    )

    CreditOffset = models.CharField(
        max_length= 30,
        default= None,
        null= True,
    )

    created_at = models.DateTimeField(auto_now_add=True)