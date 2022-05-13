package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class MainController {

    private final UserRepository userRepository;

    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(Math.toIntExact(id)).orElseThrow(RuntimeException::new);
    }
    @PostMapping
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/clients/" + savedUser.getId())).body(savedUser);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody User user) {
        User currentUser = userRepository.findById(Math.toIntExact(id)).orElseThrow(RuntimeException::new);
        currentUser.setName(user.getName());
        currentUser.setEmail(user.getEmail());

        return ResponseEntity.ok(currentUser);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userRepository.deleteById(Math.toIntExact(id));
        return ResponseEntity.ok().build();
    }
}