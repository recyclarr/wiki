$ErrorActionPreference = "Stop"

$gitIgnorePath = "$PSScriptRoot/.gitignore"

Function gig {
  param(
    [Parameter(Mandatory=$true)]
    [string[]]$list
  )
  $params = ($list | ForEach-Object { [uri]::EscapeDataString($_) }) -join ","
  Invoke-WebRequest -Uri "https://www.toptal.com/developers/gitignore/api/$params" | `
    Select-Object -ExpandProperty content | `
    Set-Content -Path $gitIgnorePath -Encoding utf8 -NoNewline
}

gig node,macos

$extraIgnore = @(
    "/build/"
    "/build2/"
    "/.yarn/"
    "" # Keep this so we get a trailing newline
)

Add-Content -Path $gitIgnorePath $($extraIgnore -join "`n") -NoNewline
