---
tagline: rootme
title: Sakura Room | OSINT
description: A THM OSINT room 
banner: /blog/SakuraRoomBanner.jpg/
banner_alt: Sakura Room Banner (if u find this, send 489jtf4893jt5ngd to me in general to get a pinned message)
date: '2024-02-29'
---

## TIP-OFF

- Finding the username was fairly easy, just opening the *.svg* in vscode shows the username

![Image showing the username in the svg file](/blog/sakuraroompics/username.png 'Fig.1')

## RECONNAISSANCE

- Getting the email was also fairly simple, pasting the [PGP key found on Aiko's Github](https://github.com/sakurasnowangelaiko/PGP) into cyberchef with [this recipe](https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true,false)&input=bVFHTkJHQUxyQVlCREFDc0dtaGNqS1JlbHNCQ05Yd1d2UDVtTjdzYU1Lc0t6RHdHT0NCQk1WaU9ONTJucVJ5ZApIaXZMc1dkd04yVXdSWGxmSm94Q001K1FseFJwenJKbGtJZ0FYR0QyM3owb3QrUzdSN3RaOFlxMkh2U2U1SkpMCkZ6b1pqQ3BoMVZzdk1mTklQWUZjdWZid2pKenZCQUcwMEpzMHJCajV0MUVIYVhLNnJ0Sno2VU1aNG4rQjJWbTkKTEl4OFZpaElVOVFmakdBeXl2WDczNVpTMXpNaEV5TkdRbXVzckRwYWh2SXdqcUVDaFZhNGh5VklBT2c3cDVGbQp0NlR6eGhTUGhOSXBBdENESVlMMVdkb25SRGdRM1ZydEc1Uy9kVE5iekRHZHZBZzEzQjhFRUgwMGQrVnFPVHB1CmZuUjRHbktGZXA1MmN6SFZrQmtyTlkxdEw1WnlZeEhVRmFTZllXaDlGSTJSVUdRU2JDaWhBSXpLU1AyNm1GZUgKSFBGbXhydlN0b3Zjb2xzNGYxdE9BNmJGK0dia2tEaitNVWd2clVaV2JlWGJSdnlvS1RKTm9uaGNmNWJNei9ENQo2U3RPUnlkMTVPK2lpTExSeWk1WGY2STJSUkhQZnA3QTRUc3VINCthT3hvVmFNeGdDRlpiN2NNWE5xRHBlSk8xCi9pZHptMEhVa0NpUDZaMEFFUUVBQWJRZ1UyRnJkWEpoVTI1dmQwRnVaMlZzT0ROQWNISnZkRzl1YldGcGJDNWoKYjIySkFkUUVFd0VLQUQ0V0lRU21VWjhuTy9pT2tTYXc5TVhzM1EvU2xCRUVVQVVDWUF1c0JnSWJBd1VKQThIcAp1Z1VMQ1FnSEFnWVZDZ2tJQ3dJRUZnSURBUUllQVFJWGdBQUtDUkRzM1EvU2xCRUVVUC85Qy8wYjZhV1FoVHI3CjBKZ2Y2OEtuUzhuVFhMSmVvaTVTOSttb1AvR1Z2dzFkc2ZMb0hrSllYdUljL2ZuZTJZMXk0cWp2RWRTQ3RBSXMKcnFSZVhub2x5eXFDV1MyZTcwWXNROVNnZzBKRzRvN3JPVm9qS0pOenVIRFdROTQ0eWhHazZ6akM1NHFIYmE2KwozN0Y5ZXJEeSt4UlFTOUJTZ0VGZjJDNjBGZTAwaSt2cE9XaXBxWUFjMVZHYVV4SE5yVlluOEZ1TzFzSVJUSW83CjEwTFJsYlVIVmdadkRJUlJsMWR5RmJGOEI3b3hyWlplOWVXUUdVUmpYRVZnMDduaDFWNVV6ZWtSdjdxTHNWeWcKc1RWM214b2R2eGd3M0ttcnhVOUZzRlNLWTlDZHU4dk45SXZGSldRUWorK3Juenl5VFVDVW14U0I5WS9MOXdSeAo0KzdEU3BmVjFlNGJHT1pLWStLUXFpcFl5cFVYMUFGTUhlYjJSS1Z2aks1RHpNRHE2Q1FzNzNqcXEvdmxZZHA0CmtOc3VjZFpLRUtuMmVWakpJb243NU92RTVjdXNPbE9qWnVSOTMrdzVDbWY0cTZEaHBYU1VUMUFQTzE2UjFldWUKOG1QVG1DcmE5ZEVtekFNc25MRVBTUFhONXR6ZHhjRHFIdnZJRHRqOE0zbDJpUnlENnYxTmVaYTVBWTBFWUF1cwpCZ0VNQU40bUs3MGpSRHh3bmpRZDhBSlMxMzNWbmNZVDQzZ2VoVm1rS2FaT0FGYXhvWnRtUjZvSmJpVHdqK2JsCmZWMUlsWFA1bEk4T0pCWjJZUEV2TEVCaHVxZUZRakVJRzRTdWszcC9IVWFJWGFWaGlJakZSem94b0laR00xTWgKWEtSc3FjM1pkM0xMZzFHaXI3c21LU012OHFJbGduWlpyT1RjcFdYOVFoOU9kL01xdENSeWc1UnQ4RmlidEtGSQpZMGo0cHZqR3N6RXZ3dXJIcVMwSnh4emRkK2pPc2ZnVGV3RkF5MS85M3NjbW1DZzdtcVVRVjc5RGJhREw0Slp2CnZDZDNyeFgwOEp5TXdkUmNPdmVSM0pKRVJzTE45djh4UHYvZHNKaFMreWFCSCtGMnZYUUVsZFhFT2F6d2RKaGoKZGRYQ1ZOem1UQ0laODVTL2xYV0xMVWE2STFXQ2NmNHM4ZmZEdjlaM0YyMUh3NjRhQVdFQStIM3YrdHZTOXB4dgpJNjMvNHUyVDJvNHB1L000ODlSK3BWLzlXN2pReWRlRTZrQ3lSREcxZG9UVkpCaTFXemh0RXFYWjNzc1NaWHBiCmJHdVVjRExicWdDTExwazYyRXM5UVF6S1ZUWGYzeWtPT0ZXYWVxRTJhTENqVmJwaTFBWkVRN2xteHRjby9NK0QKVnpKU213QVJBUUFCaVFHOEJCZ0JDZ0FtRmlFRXBsR2ZKenY0anBFbXNQVEY3TjBQMHBRUkJGQUZBbUFMckFZQwpHd3dGQ1FQQjZib0FDZ2tRN04wUDBwUVJCRkJDM3d2L1ZoSk16WW1XNmZLcmFCU0w0akRGNm9pR0VoY2Q2eFQ0CkR1dm1wWldKMjM0YVZscXFwc1RuRFFNV3lpUlRzSXBJb01xM254dklJWGErVjYxMm5SQ0JKVXp1SUNSU3hWT2MKSWkyMWdpdlZVektUYUNseWFpYnlWVnVTcDBZQkpjc3BhcDVVMTZQUWNncTEyUUFaeW5xOUt4MDQwYURrbHhSLwpOQzJrRlMwcmtxcWtrdTJSNWFSNHQydkNid3FKbmc0Ync4QTJvVmJkZTVPWExrNFNlbTlWRWhRTWRLL3YvRWdjCkZUOFNjTUxmVXM2V0VIT1JqbGtKTloxMUhnNUcvL3BtTGVoK2JpbWk4WGQyZkhBSWhJU0NaOXhJNkk3NUFyQ0oKWHZBZms5YTBSQVNuTHE0R3E5WTRMMm9EbG5yY0FDMGYxa2V5VWJkdlVBTTN0WmcrWGRhdHNnNi9PV3NLL2R5MQpJekdXRndUYkt4OEJvaXJ4MXhkNVhteFNWNkdkeEY5bjIvS1BYb1l4c0NmN2dVVHFtWGFJNldUZnNRSEdFcWo1CnZFQVZvbU1saXRDdVBtMlNTWW5Sa2NnWkcyMmZncTZyYW5kaWcvSnBzSGJUb0J0UDBQRWorYmFjZFN0ZTI5Z0oKMjNwUm5QS2MrNDFjd0wzb3E4eWIvRmhqK2Jpb2hnSXAKPWdyYms) shows us the email

![Image showing the email in the pgp key](/blog/sakuraroompics/email.png 'Fig.2')

- I found the full name on [linkedin](https://www.linkedin.com/in/aiko-abe-84a65b125/) when I was looking for more results from her username

## UNVEIL

- Most of these questions are about cryptocurrency and we can find 6 repos in her github for cryptocurrency related things and in one of them we find [this](https://github.com/sakurasnowangelaiko/ETH)

![Image showing the crypto deets in the eth repo](/blog/sakuraroompics/miningscript.png 'Fig.3')

- So now we know that she owns an Ethereum Wallet. Her crypto address is ```0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef```, her mining pool is Ethermine, and from [etherscan.io](https://etherscan.io/txs?a=0xa102397dbeebefd8cd2f73a89122fcdb53abb6ef) we know she also exchanged Tether.

## TAUNT

- Googling up the username we found back in TIP-OFF shows a [twitter account](https://twitter.com/sakuraloveraiko?lang=en) with a similar username of @sakuraloveraiko.

- The next question is looking for a URL and one of the tweets Aiko made has the words **DEEP & PASTE** capitalized and so we have to boot up Tor browser for this

![Image showing the how I found the website link](/blog/sakuraroompics/duckduckgosearch.png 'Fig.4')

- That was easy, or was it... Even though I found many links to it none of them would work until a [reddit post](https://www.reddit.com/r/onions/comments/n5328o/deeppaste_link/) saved the day again with the link

![Image showing the dark website](/blog/sakuraroompics/darkwebsite.png 'Fig.5')

- All we have to do is enter the MD5 Hash from Twitter and we get WIFI information

- Lastly, we need to search for the BSSID on wigle.net, a site that I could rant endlessly about how **shitty** (pardon my language) it is. I like how there is a database for this, but it is very poorly built, and without the help of @ElizabethNoir on Discord, I couldn't have answered it.

## HOMEBOUND

- To find the airport code for her layover, I can perform a simple Google Image search on her tweet image, and all the results tell me HND.

- For the lake question, I can look for lakes with the same number of characters in the answer box, which also made that answer simple (which was Lake Inawashiro).

- Then, to find the airport she started her travels from, we can see the Washington Monument, so searching for airports close to there shows DCA.

- Lastly, for the last question, utilizing wigle.net (bad), we can find her home city through BSSID (Hirosaki).

![My Tryhackme badge yuh](https://tryhackme-badges.s3.amazonaws.com/vipin.b.png)