from django.db import models

# Create your models here.

class Chart(models.Model):

    AcctType = models.CharField(
        max_length= 30,
        verbose_name='Account Type',
        default= '',
        null= True,
        blank=True,
    )

    Account = models.CharField(
        max_length= 10,
        verbose_name= 'Account Number',
        default= '',
        null= True,
        blank=True,
    )

    Description = models.CharField(
        max_length= 150,
        verbose_name= 'Description',
        default= '',
        null= True,
        blank=True,
    )

    Department = models.CharField(
        max_length= 50,
        verbose_name= 'Department',
        default= '',
        null= True,
        blank=True,
    )

    TypicalBal = models.CharField(
        max_length= 5,
        verbose_name= 'Typical Balance',
        default= '',
        null= True,
        blank=True,
    )

    DebitOffset = models.CharField(
        max_length= 30,
        default= '',
        null= True,
        blank=True,
    )

    CreditOffset = models.CharField(
        max_length= 30,
        default= '',
        null= True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.Account