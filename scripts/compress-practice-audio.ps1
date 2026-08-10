# Compresses the listening recordings produced by generate-mockN-audio.ps1
# into the .mp3 files the practice player actually loads.
#
# The TTS scripts write 22 kHz mono WAV, which runs to roughly 13 MB per part
# (about 670 MB for twelve tests) - far too much to commit or serve. LAME at
# -q:a 5 brings that under 2 MB per part with no audible loss on synthesised
# speech, which matters because students sit real timed tests on these files.
#
# Run this after generating or regenerating any recording. The .wav files are
# git-ignored working files; only the .mp3 output is committed.
#
#   powershell -ExecutionPolicy Bypass -File scripts\compress-practice-audio.ps1

$ErrorActionPreference = "Stop"
$audio = Join-Path $PSScriptRoot "..\public\practice-audio"

$ffmpeg = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
if (-not $ffmpeg) {
  $winget = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
  $ffmpeg = (Get-ChildItem $winget -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue |
             Select-Object -First 1).FullName
}
if (-not $ffmpeg) { throw "ffmpeg not found - install it with: winget install Gyan.FFmpeg" }

$done = 0
foreach ($wav in Get-ChildItem $audio -Filter *.wav) {
  $mp3 = [IO.Path]::ChangeExtension($wav.FullName, ".mp3")
  # Skip anything already compressed from this exact recording.
  if ((Test-Path $mp3) -and (Get-Item $mp3).LastWriteTime -ge $wav.LastWriteTime) { continue }
  & $ffmpeg -hide_banner -loglevel error -y -i $wav.FullName `
      -ac 1 -ar 22050 -codec:a libmp3lame -q:a 5 $mp3
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed on $($wav.Name)" }
  Write-Output "compressed $($wav.Name)"
  $done++
}

Write-Output "$done file(s) compressed"
Get-ChildItem $audio -Filter *.mp3 |
  Measure-Object -Property Length -Sum |
  ForEach-Object { "{0} mp3 files, {1:N1} MB total" -f $_.Count, ($_.Sum / 1MB) }
