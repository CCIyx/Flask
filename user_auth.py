from functools import wraps
import database
from flask import *
import sys


def get_username_from_database(uid):
    found_session = database.fetchOneres("SELECT username FROM user WHERE uid='{}';".format(uid))
    username = found_session[0] if found_session else None
    return username

def get_uid_from_database(username):
    found_session = database.fetchOneres("SELECT uid FROM user WHERE username='{}';".format(username))
    uid = found_session[0] if found_session else None
    return uid    

def check_login(username, password):
    correct_pwd = database.fetchOneres("SELECT passwd FROM user WHERE username='{}';".format(username))
    return correct_pwd and correct_pwd[0] == password  



def show_friends(uid_primary):
    result = True
    try:
        all_friends = database.fetchAllres("SELECT uid_secondary FROM friend WHERE uid_primary ='{}';".format(uid_primary))
    except:
        result = False
    return all_friends    

POSSIBLE_SERVER_NAMES = [
    'https://moelearn.com/'
]

def is_valid_referer(referer):
    return any(referer.startswith(name) for name in POSSIBLE_SERVER_NAMES)

def csrf_protect(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        referer = request.headers.get('Referer')
        if referer and not is_valid_referer(referer):
            print('Potential CSRF blocked', file=sys.stderr)
            return 'Potential CSRF blocked', 403
        return f(*args, **kwargs)
    return decorated_function