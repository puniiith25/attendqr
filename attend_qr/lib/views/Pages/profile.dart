import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Profile", style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: Column(
        children: [
          Center(
            child: CircleAvatar(
              backgroundImage: AssetImage('assets/images/Profile_image.png'),
              radius: 50,
            ),
          ),
          SizedBox(height: 20),
          Text("PUNITHA KM", style: TextStyle(fontWeight: FontWeight.w600)),
          SizedBox(height: 30),
          Wrap(
            direction: Axis.horizontal,
            spacing: 100, // horizontal space between children
            runSpacing: 100,
            children: [
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
              ProfileBuildRow("Id", "8888"),
            ],
          ),
        ],
      ),
    );
  }

  Widget ProfileBuildRow(String lable, String value) {
    return Row(
      children: [
        Expanded(
          flex: 1,
          child: Text(
            "$lable:",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
        ),
        Expanded(
          flex: 2,
          child: Text(
            "$value",
            style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16),
          ),
        ),
      ],
    );
  }
}

Widget buildProfileRow(String label, String value) {
  return Row(
    children: [
      Expanded(
        flex: 1,
        child: Text(
          "$label:",
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      Expanded(flex: 2, child: Text(value, style: TextStyle(fontSize: 16))),
    ],
  );
}
