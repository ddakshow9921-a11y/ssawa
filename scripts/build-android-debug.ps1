$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$node = "C:\Users\zipco\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$nodeDir = Split-Path -Parent $node
$androidDir = Join-Path $projectRoot.Path "android"
$mobileBuildDir = Join-Path $projectRoot.Path "mobile-build"

if (-not (Test-Path -LiteralPath $node)) {
  throw "Bundled Node.js was not found: $node"
}

$sdkCandidates = @(
  $env:ANDROID_HOME,
  $env:ANDROID_SDK_ROOT,
  "C:\Android\Sdk",
  (Join-Path $env:LOCALAPPDATA "Android\Sdk")
) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }

if (-not $sdkCandidates -or $sdkCandidates.Count -eq 0) {
  throw "Android SDK was not found. Install Android SDK or set ANDROID_HOME."
}

$androidSdk = @($sdkCandidates)[0]
$env:ANDROID_HOME = $androidSdk
$env:ANDROID_SDK_ROOT = $androidSdk
$env:Path = "$nodeDir;$env:Path"

Set-Location -LiteralPath $projectRoot.Path

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "build.ps1")
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

$localProperties = Join-Path $androidDir "local.properties"
$escapedSdk = $androidSdk.Replace("\", "\\").Replace(":", "\:")
Set-Content -LiteralPath $localProperties -Encoding ASCII -Value "sdk.dir=$escapedSdk"

& $node "node_modules/@capacitor/cli/bin/capacitor" "sync" "android"
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

& (Join-Path $androidDir "gradlew.bat") "-p" $androidDir "assembleDebug"
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

if (-not (Test-Path -LiteralPath $mobileBuildDir)) {
  New-Item -ItemType Directory -Path $mobileBuildDir | Out-Null
}

$sourceApk = Join-Path $androidDir "app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path -LiteralPath $sourceApk)) {
  throw "Debug APK was not created: $sourceApk"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
$targetApk = Join-Path $mobileBuildDir "ssawa-mobile-debug-$timestamp.apk"
Copy-Item -LiteralPath $sourceApk -Destination $targetApk -Force

Write-Host "Created Android debug APK:"
Write-Host $targetApk
exit 0
