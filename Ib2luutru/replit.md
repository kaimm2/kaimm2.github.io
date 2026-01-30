# IronBrew2

## Overview

IronBrew2 is a VM-based Lua 5.1 obfuscator written in C#. The project transforms Lua source code into obfuscated bytecode that runs through a custom virtual machine, making it difficult to reverse engineer. The solution includes a core obfuscation library, a command-line interface, and a web-based frontend for browser access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Project Structure

The solution follows a multi-project architecture with clear separation of concerns:

- **IronBrew2/** - Core obfuscation library containing the VM generation and Lua bytecode transformation logic
- **IronBrew2 CLI/** - Command-line interface for running obfuscation from terminal
- **IronBrew2.Web/** - ASP.NET Core web application providing a browser-based interface

### Technology Stack

- **Runtime**: .NET 8.0 (migrated from .NET Core 3.1)
- **Backend Framework**: ASP.NET Core for the web interface
- **Frontend**: Static HTML/CSS/JavaScript served from wwwroot
- **Dependencies**: System.Text.Encoding.CodePages for handling Lua's encoding requirements

### Design Decisions

**Library-First Architecture**
- The core obfuscation logic lives in a separate class library (IronBrew2)
- Both CLI and Web projects reference this library
- Enables code reuse and consistent obfuscation behavior across interfaces

**Static Web Assets**
- The web frontend uses simple static files (index.html in wwwroot)
- No complex frontend framework - keeps deployment simple
- ASP.NET Core serves static assets and handles API endpoints

**VM-Based Obfuscation Approach**
- Rather than simple string obfuscation, generates a custom virtual machine
- Lua bytecode is transformed to run on this custom VM
- Provides stronger protection than syntactic transformations alone

## External Dependencies

### NuGet Packages

- **System.Text.Encoding.CodePages** (v4.6.0-preview) - Required for proper handling of Lua source files with various text encodings
- **Microsoft.NETCore.Platforms** (v2.0.0) - Platform abstraction layer (transitive dependency)

### Runtime Requirements

- .NET 8.0 SDK for building and running
- ASP.NET Core runtime for the web interface

### No External Services

- No database required
- No external APIs consumed
- Self-contained obfuscation logic