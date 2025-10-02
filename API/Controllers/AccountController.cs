using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] //POST: localhost:5001/api/account/register

    public async Task<ActionResult<UserDto>> Register(API.DTOs.RegisterDto regDto)
    {
        if (await UserExists(regDto.Email)) return BadRequest("Email is already taken!");

        using var hmac = new System.Security.Cryptography.HMACSHA512();
        var user = new AppUser
        {
            Email = regDto.Email,
            DisplayName = regDto.DisplayName,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(regDto.Password)),
            PasswordSalt = hmac.Key
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();
        // return user;
        return user.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(API.DTOs.LoginDto loginDto)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null)
        {
            return Unauthorized("Invalid Email Id.!!");
        }

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (var i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid Password!!");
            }
        }
        return user.ToDto(tokenService);
    }
    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
