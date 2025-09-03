import 'package:attend_qr/views/data/notifiers.dart';
import 'package:flutter/material.dart';

class NavbarWidget extends StatelessWidget {
  const NavbarWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: selecteddPageNotifier,
      builder: (context, selectedPage, child) {
        return NavigationBar(
          destinations: [
            NavigationDestination(icon: Icon(Icons.home), label: "Home"),
            NavigationDestination(
              icon: Icon(Icons.qr_code_scanner),
              label: "QR-Scan",
            ),
            NavigationDestination(icon: Icon(Icons.person), label: "Profile"),
          ],
          onDestinationSelected: (selectedPage) {
            selecteddPageNotifier.value = selectedPage;
          },
          selectedIndex: selectedPage,
        );
      },
    );
  }
}
