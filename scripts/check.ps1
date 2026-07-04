$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
Set-Location -LiteralPath $projectRoot.Path

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "typecheck.ps1")
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "build.ps1")
exit $LASTEXITCODE
