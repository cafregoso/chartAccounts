# README

> Crear un entorno virtual
> 

```python
python3 -m venv <name_of_env>
```

> Instalar los requirements
> 

```python
pip install -r requirements.txt
```

> Crear archivo .env con las variables de entorno
> 

```python
SECRET_KEY = <Your secret key>

DATABASE_ENGINE= <DB Engine>
DATABASE_NAME= <DB name>
DATABASE_USER= <DB username>
DATABASE_PASSWORD= <DB Password>
DATABASE_HOST= <Host>
DATABASE_PORT= <Port>
```

> Dentro de la carpeta ‘frontend’ instalar las dependencias
> 

```jsx
yarn install
```

> Compilar para producción
> 

```jsx
yarn build
```

> Regresamos una carpeta para arriba, al nivel del [manage.py](http://manage.py) y ejecutamos los siguientes comandos
> 

```python
python3 manage.py makemigrations
python3 manage.py migrate

# Este es para crear un super usuario para el admin
python3 manage.py createsuper user
python3 manage.py collectstatic

# Por ultimo, para correr el proyecto
python3 manage.py runserver
```