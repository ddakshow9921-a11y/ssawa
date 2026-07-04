$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$node = "C:\Users\zipco\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
Set-Location -LiteralPath $projectRoot.Path
& $node "node_modules/vite/bin/vite.js" "preview" "--host" "127.0.0.1"
exit $LASTEXITCODE
