---
title: Workspace Base URI
---

<!-- we used base_uri in toml, should it be IRI, URI, URL? -->

RDF resources are identified by what's called an [Internationalized Resource Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier) (IRI).

When setting up a Knowboard workspace, you will need to specify the "base" to use as a prefix for identifying resources within the workspace:
```toml title=".knowboard.toml"
base_uri = <...>
```

This can get a bit confusing due to the numerous different standards available, but this guide aims to provide some simple recommendations.

## Using your email

[Tag URIs](https://en.wikipedia.org/wiki/Tag_URI_scheme) provide a simple pattern for anyone to create unique names based on just an email or domain.

The Knowboard documentation uses `tag:` URIs with an email by default, since this is something most users will already have:
```toml title=".knowboard.toml"
base_uri = "tag:me@example.com,2026:my-workspace/"
```

So, for your base URI you just need 3 things:
- **email** — An email address assigned to you. Here `me@example.com`.
- **date** — A date when you were in possession of that email. Here `2026` is a shorthand notation that says you had that email on `2026-01-01`.
- **workspace name** — Choose a descriptive name for your workspace.

The combination of email and date make the identifier unique to you. If you recently acquired the email address you may need to use the full date like `2026-04-27`. However you can omit the day or month if you had that email on the 1st day. So, `2026` would mean `2026-01-01`, or `2026-04` for `2026-04-01`.

The workspace name can be something memorable. Letters, numbers, and dashes provide the most compatibility, though the IRI specification does allow for most Unicode characters. Hovever, do not include spaces.

## Domains

Domain names can also be used in the base URI. Even if you have not registered a custom domain, you may have some assigned to you at other websites. For example, if you have a GitHub account, the domain `username.github.io` will be assigned for you to use with [GitHub Pages](https://docs.github.com/pages) and would be valid for you to use.

The Tag URI scheme described above can also use a domain in place of the email:

```toml title=".knowboard.toml"
base_uri = "tag:username.github.io,2026:my-workspace/"
```

You can also specify your domain as a full URL for the base:

```toml title=".knowboard.toml"
base_uri = "https://username.github.io/my-workspace/"
```

Using the URL like this does not require you to host the files publicly at that location since it only needs to serve as a unique identifier. However, this can sometimes lead to confusing behavior by clicking on one of these, opening the browser to a location that does not exist.
